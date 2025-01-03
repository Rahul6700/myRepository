package main

import (
  "github.com/gin-gonic/gin"
  "backend/auth"
)

func main () {
  r := gin.Default()
  
  r.POST("/signup",auth.Signup);
  r.POST("/signin",auth.Signin);
  r.GET("/fetch",auth.Fetch);

  r.Run();

}
