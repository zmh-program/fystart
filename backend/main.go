package main

import "github.com/gin-gonic/gin"

func main() {
	ConnectRedis()
	app := gin.Default()

	app.Use(CORSMiddleware())
	app.GET("/gpt", func(c *gin.Context) {
		ChatGPTAPI(c, c.Query("message"))
	})
	app.POST("/gpt", func(c *gin.Context) {
		ChatGPTAPI(c, c.PostForm("message"))
	})
	err := app.Run(":8080")
	if err != nil {
		return
	}
}
