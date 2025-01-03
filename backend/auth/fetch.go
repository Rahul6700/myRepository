package auth

import (
  "github.com/gin-gonic/gin"
  "gorm.io/gorm"
  //"github.com/golang-jwt/jwt/v5"
  "gorm.io/driver/sqlite"
  "backend/models"
)

func Fetch (c* gin.Context) {

  db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{})
  if err != nil {
    c.JSON(500, gin.H {"error" : "error connecting to db"})
    return
  }

  var userArray []models.User
  result := db.Find(&userArray)

  if result.Error != nil {
    c.JSON(500, gin.H {"error" : "failed to fetch users from db"})
    return
  }

  if len(userArray) == 0 {
    c.JSON(404, gin.H{"error" : "no users found"})
  } else {
    c.JSON(201, gin.H{"success" : userArray})
  }

}


