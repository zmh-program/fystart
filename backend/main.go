package main

import "github.com/gin-gonic/gin"

func main() {
	app := gin.Default()
	cache := ConnectRedis()

	app.Use(CORSMiddleware())
	app.GET("/", func(c *gin.Context) {

	})
	err := app.Run(":8080")
	if err != nil {
		return
	}
}
