package main

import (
  "github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
  "backend/auth"
)

func main () {
  r := gin.Default()


   r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000"}, 
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
    AllowCredentials: true,  // allows cookies and hence our jwt
  }))

  r.POST("/signup",auth.Signup);
  r.POST("/signin",auth.Signin);
  r.GET("/fetch",auth.Fetch);
  r.GET("/color",auth.ColorChange);

  r.Run(":8080");

}
