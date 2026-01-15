package main

import (
	"github.com/dmslmvsk/task-manager-app/internal/database"
	"github.com/dmslmvsk/task-manager-app/internal/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.ConnectDB()

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.Use(cors.New(config))

	r.GET("/tasks", handlers.GetTasks)
	r.POST("/tasks", handlers.CreateTask)
	r.PATCH("/tasks/:id", handlers.UpdateTaskStatus) // Обновление
	r.DELETE("/tasks/:id", handlers.DeleteTask)
	r.Run(":8080")
}