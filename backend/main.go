package main

import (
	"context"
	"database/sql"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"time"
)

type User struct {
	UserID      uuid.UUID      `json:"ID"`
	Username    string         `json:"username"`
	Email       string         `json:"email"`
	PicURL      sql.NullString `json:"picURL"`
	MemberSince time.Time      `json:"memberSince"`
	LastLogin   time.Time      `json:"lastLogin"`
}

type Song struct {
	SongID       uuid.UUID      `json:"songID"`
	UserID       uuid.UUID      `json:"userID"`
	Name         string         `json:"name"`
	Length       time.Time      `json:"length"`
	StorageURL   string         `json:"storageURL"`
	Plays        int            `json:"plays"`
	DateUploaded time.Time      `json:"dateUploaded"`
	ArtURL       sql.NullString `json:"artURL"`
}

type HomePageSong struct {
	SongID       uuid.UUID      `json:"songID"`
	UserID       uuid.UUID      `json:"userID"`
	Name         string         `json:"name"`
	StorageURL   string         `json:"storageURL"`
	DateUploaded time.Time      `json:"dateUploaded"`
	ArtURL       sql.NullString `json:"artURL"`
	Username     string         `json:"username"`
	PicURL       string         `json:"picURL"`
}

func getDBPool() *pgxpool.Pool {
	pool, err := pgxpool.New(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal("Couldn't connect to pool: ", err)
	}
	return pool
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
				&newSong.Length, &newSong.StorageURL, &newSong.Plays,
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
			err := rows.Scan(&newSong.SongID, &newSong.UserID, &newSong.Name, &newSong.StorageURL,
				&newSong.DateUploaded, &newSong.ArtURL, &newSong.Username, &newSong.PicURL)
			if err != nil {
				log.Fatal(err)
			}

			allSongs = append(allSongs, newSong)
		}

		c.JSON(http.StatusOK, allSongs)
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
	router.GET("/users", getAllUsers(pool))
	router.GET("/songs", getAllSongs(pool))
	router.GET("/homepage/songs", getHomePageSongs(pool))
	router.GET("/users/:id", getUserByID(pool))

	// Run it
	err = router.Run("localhost:8080")
	if err != nil {
		log.Fatal("Could not start!", err)
	}
}
