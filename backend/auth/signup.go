package auth

import (
  "github.com/gin-gonic/gin"
  "gorm.io/gorm"
  "gorm.io/driver/sqlite"
  "backend/models"
)

func Signup (c* gin.Context) {
  var dets models.User;
  c.BindJSON(&dets);

  db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{});
  if err != nil {
    c.JSON(500, gin.H{"error":"unable to connect to db"})
    return
  }

  db.AutoMigrate(&models.User{});

  var existingUser models.User
  result := db.Where("username = ?", dets.Username).First(&existingUser);

  if result.Error == nil {
    c.JSON(409, gin.H{"error":"username already taken"})
    return
  } else if result.Error != gorm.ErrRecordNotFound {
    c.JSON(500, gin.H{"error" : "error checking db for username duplicate"})
    return
  }

  db.Create(&dets)

  c.JSON(201, gin.H{"success" : "account created successfully"});

}
