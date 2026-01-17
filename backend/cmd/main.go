package main

import (
	"log"

	"github.com/dmslmvsk/task-manager-app/internal/database"
	"github.com/dmslmvsk/task-manager-app/internal/handlers"
	"github.com/dmslmvsk/task-manager-app/internal/middleware" // 1. Импортируем middleware
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	database.ConnectDB()

	r := gin.Default()


	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(config))


	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/tasks", handlers.GetTasks)
		protected.POST("/tasks", handlers.CreateTask)
		protected.PATCH("/tasks/:id", handlers.UpdateTaskStatus)
		protected.DELETE("/tasks/:id", handlers.DeleteTask)
	}

	r.Run(":8080")
}