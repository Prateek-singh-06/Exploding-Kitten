package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

var (
	redisClient *redis.Client
	upgrader    = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

func init() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		return
	}

	password := os.Getenv("PASSWORD")
	serverURL := os.Getenv("SERVER_URL")
	// Connect to Redis database
	redisClient = redis.NewClient(&redis.Options{
		Addr:     serverURL,
		Password: password,
		DB:       0, // use default DB
	})
}

type User struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
}

// Handler handles HTTP requests.
func Handler(w http.ResponseWriter, r *http.Request) {
	conn, _ := upgrader.Upgrade(w, r, nil) // error ignored for sake of simplicity
	defer conn.Close()

	for {
		// Read message from browser
		msgType, msg, err := conn.ReadMessage()
		if err != nil {
			return
		}
		fmt.Println(string(msg))
		if string(msg) != "1" {
			var user User
			error := json.Unmarshal([]byte(msg), &user)
			if error != nil {
				log.Fatal(error)
				return
			}

			jsonUser, err := json.Marshal(user)
			if err != nil {
				log.Fatal(err)
				return
			}

			err = redisClient.Set(r.Context(), user.Name, string(jsonUser), 0).Err()
			if err != nil {
				log.Fatal(err)
				return
			}
		} else {
			ctx := context.Background()
			// Get all keys
			keys, err := redisClient.Keys(ctx, "*").Result()
			if err != nil {
				log.Fatal(err)
			}

			usersdata := make([]User, 0)

			for _, key := range keys {
				value, err := redisClient.Get(ctx, key).Result()
				if err != nil {
					log.Fatal(err)
				}
				fmt.Println("Value:", value)

				var userindb User
				err = json.Unmarshal([]byte(value), &userindb)
				if err != nil {
					log.Fatal(err)
					return
				}

				usersdata = append(usersdata, userindb)

			}
			newjsonUser, err := json.Marshal(usersdata)
			if err != nil {
				log.Fatal(err)
				return
			}
			if err = conn.WriteMessage(msgType, newjsonUser); err != nil {
				return
			}

		}
	}
}

func main() {
	http.HandleFunc("/echo", Handler)
	http.ListenAndServe(":8080", nil)
}
