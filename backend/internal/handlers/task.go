package handlers

import (
	"net/http"

	"github.com/dmslmvsk/task-manager-app/internal/database"
	"github.com/dmslmvsk/task-manager-app/internal/models"
	"github.com/gin-gonic/gin"
)

func GetTasks(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var tasks []models.Task
	err := database.DB.Select(&tasks, "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC", userID)
	if err != nil {
		c.JSON(http.StatusOK, []models.Task{})
		return
	}

	c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var input struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var newTask models.Task
	err := database.DB.QueryRow(
		"INSERT INTO tasks (title, description, user_id, status) VALUES ($1, $2, $3, 'new') RETURNING id, title, description, status, user_id",
		input.Title, input.Description, userID,
	).Scan(&newTask.ID, &newTask.Title, &newTask.Description, &newTask.Status, &newTask.UserID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		return
	}

	c.JSON(http.StatusCreated, newTask)
}

func UpdateTaskStatus(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	id := c.Param("id")
	var input struct {
		Status string `json:"status" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := database.DB.Exec(
		"UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3",
		input.Status, id, userID,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found or access denied"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task updated"})
}

func DeleteTask(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	id := c.Param("id")

	result, err := database.DB.Exec("DELETE FROM tasks WHERE id = $1 AND user_id = $2", id, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found or access denied"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
}