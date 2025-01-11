package home

import (
  "github.com/gin-gonic/gin"
  "github.com/golang-jwt/jwt/v5"
  "github.com/google/uuid"
  "backend/key"
)

func ColorChange(c *gin.Context){
  //token validation happens first
  tokenstring, err := c.Cookie("jwt_authorization");//fetching token from the cookie
  if err != nil {
		c.JSON(498, gin.H{"error" : "token expired, login again"})
  }
  if tokenstring == "" {
    c.JSON(498, gin.H{"error" : "token expired, login again"})
    return
  }

  //token signing using the secret key
	token, err := jwt.Parse(tokenstring, func(token *jwt.Token) (interface{}, error) {
		return []byte(key.KEY), nil 
	})

  //if validation fails, the function execution terminates
	if err != nil || !token.Valid {
		c.JSON(498, gin.H{"error" : "Token expired, login again"})
		return
	}

	var code string;
	id := uuid.New().String()
	code = "#" + id[:6]
	c.JSON(201,gin.H{"success" : code});

}
