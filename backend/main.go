package main

import (
	"context"
	"database/sql"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
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

func getAllUsers(c *gin.Context) {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal("Could not connect to DB", err)
	}
	defer conn.Close(context.Background())

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

func getAllSongs(c *gin.Context) {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal("Could not connect to DB", err)
	}
	defer conn.Close(context.Background())

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

func getUserByID(c *gin.Context) {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal("Could not connect to DB", err)
	}
	defer conn.Close(context.Background())

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

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Could not load .env file", err)
	}

	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/users", getAllUsers)
	router.GET("/songs", getAllSongs)
	router.GET("/users/:id", getUserByID)
	err = router.Run("localhost:8080")
	if err != nil {
		log.Fatal("Could not start!", err)
	}
}
