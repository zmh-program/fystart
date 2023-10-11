package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"net/http"
	"strings"
	"time"
)

var allowedOrigins = []string{
	"https://fystart.com",
	"https://www.fystart.com",
	"https://deeptrain.net",
	"https://www.deeptrain.net",
	"http://localhost",
	"http://localhost:5173",
}

type Limiter struct {
	Duration int
	Count    int64
}

func (l *Limiter) RateLimit(ctx *gin.Context, rds *redis.Client, ip string, path string) bool {
	key := fmt.Sprintf("rate%s:%s", path, ip)
	count, err := rds.Incr(ctx, key).Result()
	if err != nil {
		return true
	}
	if count == 1 {
		rds.Expire(ctx, key, time.Duration(l.Duration)*time.Second)
	}
	return count > l.Count
}

var limits = map[string]Limiter{
	"/login":        {Duration: 10, Count: 5},
	"/state":        {Duration: 1, Count: 2},
	"/github":       {Duration: 60, Count: 45},
	"/storage/sync": {Duration: 120, Count: 60},
}

func GetPrefixMap[T comparable](s string, p map[string]T) *T {
	for k, v := range p {
		if strings.HasPrefix(s, k) {
			return &v
		}
	}
	return nil
}

func ThrottleMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()
		path := c.Request.URL.Path
		rds := c.MustGet("cache").(*redis.Client)
		limiter := GetPrefixMap[Limiter](path, limits)
		if limiter != nil && limiter.RateLimit(c, rds, ip, path) {
			c.JSON(200, gin.H{"status": false, "reason": "You have sent too many requests. Please try again later."})
			c.Abort()
			return
		}
		c.Next()
	}
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
