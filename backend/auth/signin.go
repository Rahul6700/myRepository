package auth

import (
  "github.com/gin-gonic/gin"
  "gorm.io/gorm"
  "github.com/golang-jwt/jwt/v5"
  "gorm.io/driver/sqlite"
  "time"
  "backend/models"
  "backend/key"
)

func Signin (c* gin.Context) {
  var dets models.User
  c.BindJSON(&dets)

  db, err := gorm.Open(sqlite.Open("users.db"), &gorm.Config{});
  if err != nil {
    c.JSON(500, gin.H{"error" : "couldnt connect to db"});
    return
  }

  var existingUser models.User
  result := db.Where("username = ? AND password = ?", dets.Username, dets.Password).First(&existingUser);
  
  if result.Error != nil {
    if result.Error == gorm.ErrRecordNotFound {
      c.JSON(401, gin.H{"error" : "invalid username or password"})
    } else {
      c.JSON(500, gin.H{"error" : "error checking database"})
    }
    return
  }
  
	ttl := time.Second * 10 //token's time to live is 5 mins
	claims := jwt.MapClaims{
		"username": dets.Username,
		"exp":      time.Now().Add(ttl).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(key.KEY))
	if err != nil {
		c.JSON(500,gin.H{"error" : "error signing token"})
		return
	}

  c.JSON(201, gin.H{"success" : tokenString });

}


