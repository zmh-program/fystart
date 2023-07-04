package main

import (
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigFile("config.yaml")
	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}

	ConnectRedis()
	app := gin.Default()

	app.Use(CORSMiddleware())
	app.GET("/gpt", func(c *gin.Context) {
		ChatGPTAPI(c, c.Query("message"))
	})
	app.POST("/gpt", func(c *gin.Context) {
		ChatGPTAPI(c, c.PostForm("message"))
	})
	err := app.Run(":8001")
	if err != nil {
		panic(err)
	}
}
