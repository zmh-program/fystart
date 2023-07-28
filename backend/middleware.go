package main

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"net/http"
	"strings"
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
				c.Writer.Header().Set("Access-Control-Max-Age", "3600")
				c.AbortWithStatus(http.StatusOK)
				return
			}
		}

		c.Next()
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := strings.TrimSpace(c.GetHeader("Authorization"))
		if token != "" {
			if user := ParseToken(c, token); user != nil {
				c.Set("token", token)
				c.Set("auth", true)
				c.Set("user", user.Username)
				c.Next()
				return
			}
		}

		c.Set("token", token)
		c.Set("auth", false)
		c.Set("user", "")
		c.Next()
	}
}

func BuiltinMiddleWare(db *sql.DB, cache *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("db", db)
		c.Set("cache", cache)
		c.Next()
	}
}
