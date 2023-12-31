package main

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type User struct {
	UserID      uuid.UUID      `json:"userId"`
	Username    string         `json:"username"`
	Email       sql.NullString `json:"email"`
	PicURL      sql.NullString `json:"picURL"`
	MemberSince time.Time      `json:"memberSince"`
	LastLogin   time.Time      `json:"lastLogin"`
	HashedPass  string         `json:"hashedPass"`
}

type UserPage struct {
	UserID      uuid.UUID      `json:"userId"`
	Username    string         `json:"username"`
	PicURL      sql.NullString `json:"picURL"`
	MemberSince time.Time      `json:"memberSince"`
	LastLogin   time.Time      `json:"lastLogin"`
	Songs       []HomePageSong `json:"songs"`
}

type Song struct {
	SongID       uuid.UUID      `json:"songID"`
	UserID       uuid.UUID      `json:"userID"`
	Name         string         `json:"name"`
	StorageURL   string         `json:"storageURL"`
	Plays        int            `json:"plays"`
	DateUploaded time.Time      `json:"dateUploaded"`
	ArtURL       sql.NullString `json:"artURL"`
}

type HomePageSong struct {
	SongID       uuid.UUID      `json:"songID"`
	Likes        int8           `json:"likes"`
	UserID       uuid.UUID      `json:"userID"`
	Name         string         `json:"name"`
	StorageURL   string         `json:"storageURL"`
	DateUploaded time.Time      `json:"dateUploaded"`
	ArtURL       sql.NullString `json:"artURL"`
	Username     string         `json:"username"`
	PicURL       sql.NullString `json:"picURL"`
}

type RegisterUserRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginUserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type DiscordResponse struct {
	AccessToken  string `json:"access_token"`
	TokenType    string `json:"token_type"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	Scope        string `json:"scope"`
}

type DiscordUser struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Avatar   string `json:"avatar"`
}

func getDBPool() *pgxpool.Pool {
	pool, err := pgxpool.New(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal("Couldn't connect to pool: ", err)
	}
	return pool
}

func registerUser(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		var reqUser RegisterUserRequest
		var userId uuid.UUID

		err = c.BindJSON(&reqUser)
		if err != nil {
			log.Fatal(err)
		}
		log.Default().Println(reqUser)

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(reqUser.Password), bcrypt.DefaultCost)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}

		query := "INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING user_id"
		err = conn.QueryRow(context.Background(), query, reqUser.Username, reqUser.Email, hashedPassword).Scan(&userId)
		if err != nil {
			log.Fatal("Could not complete query: ", err)
		}

		c.JSON(http.StatusCreated, gin.H{
			"userId":   userId,
			"username": reqUser.Username,
			"email":    reqUser.Email,
		})
	}
}

func loginUser(pool *pgxpool.Pool) gin.HandlerFunc {
	//Let us see if this works
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		var loginUser LoginUserRequest
		err = c.BindJSON(&loginUser)
		if err != nil {
			log.Fatal(err)
		}

		query := "SELECT * FROM users WHERE username = $1"
		var user User

		err = conn.QueryRow(context.Background(), query, loginUser.Username).Scan(&user.UserID, &user.Username, &user.Email, &user.PicURL, &user.MemberSince, &user.LastLogin, &user.HashedPass)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "Invalid username or password",
			})
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(user.HashedPass), []byte(loginUser.Password))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "Invalid username or password",
			})
			return
		}

		currentTime := time.Now().UTC()
		successQuery := "UPDATE users SET last_login=$1 WHERE user_id=$2"
		_, err = conn.Exec(context.Background(), successQuery, currentTime, user.UserID)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"message": "Could not update user last login time",
			})
			return
		}

		c.JSON(http.StatusOK, user)
	}
}

func getAllUsers(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		query := "SELECT * FROM users"
		rows, err := conn.Query(context.Background(), query)
		if err != nil {
			log.Fatal("Could not complete query: ", err)
		}

		var allUsers []User

		for rows.Next() {
			var newUser User
			err := rows.Scan(&newUser.UserID, &newUser.Username, &newUser.Email,
				&newUser.PicURL, &newUser.MemberSince, &newUser.LastLogin)
			if err != nil {
				log.Fatal(err)
			}
			allUsers = append(allUsers, newUser)
		}

		c.JSON(http.StatusOK, allUsers)

	}
}

func getAllSongs(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		query := "SELECT * FROM songs"
		rows, err := conn.Query(context.Background(), query)
		if err != nil {
			log.Fatal("Could not complete query: ", err)
		}

		var allSongs []Song

		for rows.Next() {
			var newSong Song
			err := rows.Scan(&newSong.SongID, &newSong.UserID, &newSong.Name,
				&newSong.StorageURL, &newSong.Plays,
				&newSong.DateUploaded, &newSong.ArtURL)
			if err != nil {
				log.Fatal(err)
			}

			allSongs = append(allSongs, newSong)
		}

		c.JSON(http.StatusOK, allSongs)
	}
}

func getHomePageSongs(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		query := "SELECT * FROM home_page_songs ORDER BY date_uploaded DESC "
		rows, err := conn.Query(context.Background(), query)
		if err != nil {
			log.Fatal("Could not complete query: ", err)
		}

		var allSongs []HomePageSong

		for rows.Next() {
			var newSong HomePageSong
			err := rows.Scan(&newSong.SongID, &newSong.Likes, &newSong.UserID, &newSong.Name, &newSong.StorageURL,
				&newSong.DateUploaded, &newSong.ArtURL, &newSong.Username, &newSong.PicURL)
			if err != nil {
				log.Fatal("Error With Homepage Songs", err)
			}

			allSongs = append(allSongs, newSong)
		}

		c.JSON(http.StatusOK, allSongs)
	}
}

func getUserInfoByUsername(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		username := c.Param("username")

		userQuery := "SELECT user_id, username, pic_url, member_since, last_login FROM users WHERE username = $1"
		var user UserPage
		err = conn.QueryRow(context.Background(), userQuery, username).Scan(&user.UserID, &user.Username, &user.PicURL, &user.MemberSince, &user.LastLogin)
		if err != nil {
			log.Println("Error with user query:", err)
			return
		}

		songQuery := "SELECT * FROM home_page_songs WHERE user_id = $1"
		rows, err := conn.Query(context.Background(), songQuery, user.UserID)
		if err != nil {
			log.Fatal(err)
		}

		// Create an empty array to store songs
		var userSongs []HomePageSong

		// Iterate through the query results and create Song objects
		for rows.Next() {
			var song HomePageSong
			err := rows.Scan(&song.SongID, &song.Likes, &song.UserID, &song.Name, &song.StorageURL, &song.DateUploaded, &song.ArtURL, &song.Username, &song.PicURL)
			if err != nil {
				log.Fatal(err)
			}
			userSongs = append(userSongs, song)
		}
		user.Songs = userSongs

		c.JSON(http.StatusOK, user)
	}
}

func getUserByID(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		userID := c.Param("id")
		query := "SELECT * FROM users WHERE user_id = $1"
		var user User

		err = conn.QueryRow(context.Background(), query,
			userID).Scan(&user.UserID, &user.Username, &user.Email, &user.PicURL,
			&user.MemberSince, &user.LastLogin)
		if err != nil {
			log.Fatal("Could not complete query: ", err)
		}

		c.JSON(http.StatusOK, user)
	}
}

func getLikesBySongID(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		songID := c.Param("songid")
		query := "SELECT COUNT(user_id) FROM songlikes WHERE song_id=$1 GROUP BY song_id"

		var likes int8

		err = conn.QueryRow(context.Background(), query, songID).Scan(&likes)
		if err != nil {
			log.Fatal("Could not complete query: ", err)
		}

		c.JSON(http.StatusOK, likes)
	}
}

func checkUsernameAvailability(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		username := c.Query("username")

		var result string
		query := "SELECT username FROM users WHERE username = $1"
		err = conn.QueryRow(context.Background(), query, username).Scan(&result)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"result":  true,
				"message": "Username is available!",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"result":  false,
				"message": "Username is not available!",
			})
		}
	}
}

func getDiscordToken(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		authCode := c.Param("code")
		theUrl := "https://discord.com/api/oauth2/token"

		clientID := os.Getenv("DISCORD_ID")
		clientSecret := os.Getenv("DISCORD_SECRET")

		payload := url.Values{
			"client_id":     {clientID},
			"client_secret": {clientSecret},
			"grant_type":    {"authorization_code"},
			"code":          {authCode},
			//"redirect_uri":  {"http://localhost:3000/auth"},
			"redirect_uri": {"https://audiobytes.app/auth"},
		}
		fmt.Println("Payload", payload.Encode())

		req, err := http.NewRequest("POST", theUrl, strings.NewReader(payload.Encode()))
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			fmt.Println("Error sending request:", err)
			return
		}
		defer resp.Body.Close()

		var discordResponse DiscordResponse
		if err := json.NewDecoder(resp.Body).Decode(&discordResponse); err != nil {
			log.Fatal("Error decoding response:", err)
			return
		}

		fmt.Println("First Response from Discord", discordResponse)

		userUrl := "https://discord.com/api/v10/users/@me"

		req, err = http.NewRequest("GET", userUrl, nil)
		if err != nil {
			log.Fatal("Error with GET request")
			return
		}
		req.Header.Set("Authorization", "Bearer "+discordResponse.AccessToken)

		resp, err = client.Do(req)
		if err != nil {
			fmt.Println("Error sending request:", err)
			return
		}
		defer resp.Body.Close()

		var response DiscordUser
		err = json.NewDecoder(resp.Body).Decode(&response)
		if err != nil {
			fmt.Println("Error decoding response:", err)
			return
		}
		fmt.Println("Response from Discord", response)

		// Check if user exists
		var user User
		query := "SELECT user_id, username, pic_url	 FROM users WHERE username = $1"
		err = conn.QueryRow(context.Background(), query, response.Username).Scan(&user.UserID, &user.Username, &user.PicURL)
		if err != nil {
			fmt.Println("User does not exist")
			fmt.Println(err)
			var imgURL string
			if response.Avatar == "" {
				imgURL = "https://cdn.discordapp.com/embed/avatars/4.png"
			} else {
				imgURL = fmt.Sprintf("https://cdn.discordapp.com/avatars/%s/%s.png", response.Id, response.Avatar)
			}

			var newUser User
			query = "INSERT INTO users (username, pic_url) VALUES ($1, $2) RETURNING user_id, pic_url"
			err = conn.QueryRow(context.Background(), query, response.Username, imgURL).Scan(&newUser.UserID, &newUser.PicURL)
			if err != nil {
				log.Fatal("Could not complete query: ", err)
			}

			c.JSON(http.StatusCreated, gin.H{
				"userId":     newUser.UserID,
				"username":   response.Username,
				"profilePic": newUser.PicURL,
			})
		} else {
			currentTime := time.Now().UTC()
			successQuery := "UPDATE users SET last_login=$1 WHERE user_id=$2"
			_, err = conn.Exec(context.Background(), successQuery, currentTime, user.UserID)
			if err != nil {
				c.JSON(http.StatusOK, gin.H{
					"message": "Could not update user last login time",
				})
				return
			}

			fmt.Println("User exists")
			c.JSON(http.StatusOK, gin.H{
				"userId":     user.UserID,
				"username":   user.Username,
				"profilePic": user.PicURL,
			})
			return
		}

	}
}

func uploadFileToSpaces(fileKey string, fileContent []byte) (string, error) {

	spacesKey := os.Getenv("SPACES_KEY")
	spacesSecret := os.Getenv("SPACES_SECRET")
	fileExt := filepath.Ext(fileKey)
	newUUID := uuid.New()
	safeFileKey := newUUID.String() + fileExt
	region := "nyc3"
	bucketName := "audiobytes"

	// Initialize DigitalOcean Spaces client
	config := aws.NewConfig().
		WithEndpoint("https://nyc3.digitaloceanspaces.com").
		WithRegion(region).
		WithCredentials(credentials.NewStaticCredentials(spacesKey, spacesSecret, ""))
	svc := s3.New(session.New(), config)

	// Upload the file to your Space
	_, err := svc.PutObject(&s3.PutObjectInput{
		Bucket:        aws.String(bucketName),
		Key:           aws.String(safeFileKey),
		Body:          bytes.NewReader(fileContent),
		ContentLength: aws.Int64(int64(len(fileContent))),
		ContentType:   aws.String("application/octet-stream"),
		ACL:           aws.String("public-read"),
	})

	if err != nil {
		fmt.Println("Error uploading file:", err)
	}

	// Construct the URL
	fileURL := fmt.Sprintf("https://%s.%s.digitaloceanspaces.com/%s", bucketName, region, safeFileKey)

	return fileURL, nil
}

func uploadSong(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		conn, err := pool.Acquire(context.Background())
		if err != nil {
			log.Fatal(err)
		}
		defer conn.Release()

		// Get song File
		songFile, err := c.FormFile("songFile")
		if err != nil {
			fmt.Println("Error with file:", err)
			return
		}
		songFileOpen, err := songFile.Open()
		if err != nil {
			fmt.Println("Error with file:", err)
			return
		}
		defer songFileOpen.Close()
		songFileContent, err := io.ReadAll(songFileOpen)
		if err != nil {
			fmt.Println("Error with file:", err)
			return
		}

		// Get art File
		artFile, err := c.FormFile("artFile")
		if err != nil {
			fmt.Println("Error with file:", err)
			return
		}
		artFileOpen, err := artFile.Open()
		if err != nil {
			fmt.Println("Error with file:", err)
			return
		}
		defer artFileOpen.Close()
		artFileContent, err := io.ReadAll(artFileOpen)
		if err != nil {
			fmt.Println("Error with file:", err)
			return
		}

		songFileUrl, err := uploadFileToSpaces(songFile.Filename, songFileContent)
		artFileUrl, err := uploadFileToSpaces(artFile.Filename, artFileContent)
		userId := c.PostForm("userId")
		songName := c.PostForm("songName")

		// Upload to DB
		query := "INSERT INTO songs (user_id, name, storage_url, art_url) VALUES ($1, $2, $3, $4)"
		_, err = conn.Exec(context.Background(), query, userId, songName, songFileUrl, artFileUrl)
		if err != nil {
			fmt.Println("Error uploading to DB:", err)
			c.Status(http.StatusInternalServerError)
		}

		c.Status(http.StatusCreated)
	}
}

func main() {
	// Load .env Variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Could not load .env file", err)
	}

	// Create Pool
	pool := getDBPool()
	defer pool.Close()

	// Setup Router
	router := gin.Default()
	router.Use(cors.Default())

	// Setup Paths
	router.POST("/register", registerUser(pool))
	router.POST("/login", loginUser(pool))
	router.GET("/users", getAllUsers(pool))
	router.GET("/songs", getAllSongs(pool))
	router.GET("/homepage/songs", getHomePageSongs(pool))
	router.GET("/users/:id", getUserByID(pool))
	router.GET("/userinfo/:username", getUserInfoByUsername(pool))
	router.GET("/likes/song/:songid", getLikesBySongID(pool))
	router.GET("/check-username", checkUsernameAvailability(pool))
	router.GET("/discordtoken/:code", getDiscordToken(pool))
	router.POST("/upload", uploadSong(pool))

	// Run it
	err = router.Run("0.0.0.0:8080")
	if err != nil {
		log.Fatal("Could not start!", err)
	}
}
