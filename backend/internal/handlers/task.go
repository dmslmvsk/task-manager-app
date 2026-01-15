package handlers

import (
	"net/http"

	"github.com/dmslmvsk/task-manager-app/internal/database"
	"github.com/dmslmvsk/task-manager-app/internal/models"
	"github.com/gin-gonic/gin"
)

func GetTasks(c *gin.Context) {
	tasks := []models.Task{}
	
	query := "SELECT * FROM tasks ORDER BY id DESC"
	
	err := database.DB.Select(&tasks, query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tasks"})
		return
	}

	c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
	var input models.Task

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		INSERT INTO tasks (title, description, status) 
		VALUES ($1, $2, $3) 
		RETURNING id`

	var newID int
	err := database.DB.QueryRow(query, input.Title, input.Description, "new").Scan(&newID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		return
	}

	input.ID = newID
	input.Status = "new"

	c.JSON(http.StatusCreated, input)
}

func UpdateTaskStatus(c *gin.Context) {
	id := c.Param("id")
	var input struct {
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := database.DB.Exec("UPDATE tasks SET status = $1 WHERE id = $2", input.Status, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task updated"})
}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")

	_, err := database.DB.Exec("DELETE FROM tasks WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
}
