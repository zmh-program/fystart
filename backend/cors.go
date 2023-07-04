package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

var allowedOrigins = []string{
	"https://fystart.cn",
	"https://www.fystart.cn",
	"https://deeptrain.net",
	"https://www.deeptrain.net",
	"http://localhost",
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		if Contains(origin, allowedOrigins) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

			if c.Request.Method == "OPTIONS" {
				c.AbortWithStatus(http.StatusOK)
				return
			}
		}

		c.Next()
	}
}
