package handlers

import (
	"net/http"
	"os"
	"time"

	"github.com/dmslmvsk/task-manager-app/internal/database"
	"github.com/dmslmvsk/task-manager-app/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *gin.Context) {
    var input struct {
        Email    string `json:"email" binding:"required,email"`
        Password string `json:"password" binding:"required"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Wrong data"})
        return
    }

    var user models.User
    err := database.DB.Get(&user, "SELECT * FROM users WHERE email = $1", input.Email)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        return
    }

    err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Password is wrongh"})
        return
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user_id": user.ID,                                    
        "exp":     time.Now().Add(time.Hour * 24 * 7).Unix(), 
    })

    tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Token generation failure"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "token": tokenString,
        "user": gin.H{
            "username": user.Username,
            "email":    user.Email,
        },
    })
}


func Register(c *gin.Context) {
    var input struct {
        Email    string `json:"email" binding:"required,email"`
        Username string `json:"username" binding:"required"`
        Password string `json:"password" binding:"required,min=6"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Wrong data"})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Crypt error"})
        return
    }

    _, err = database.DB.Exec(
        "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)",
        input.Email, input.Username, string(hashedPassword),
    )

    if err != nil {
        c.JSON(http.StatusConflict, gin.H{"error": "Email or Login are already used"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "User successfully registered"})
}