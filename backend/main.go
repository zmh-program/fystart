package main

import (
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"net/http"
)

type RequestBody struct {
	Message string `json:"message" required:"true"`
}

func main() {
	viper.SetConfigFile("config.yaml")
	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}

	ConnectRedis()

	if viper.GetBool("debug") {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	app := gin.Default()

	app.Use(CORSMiddleware())
	app.Handle("GET", "/gpt", func(c *gin.Context) {
		ChatGPTAPI(c, c.Query("message"))
	})
	app.Handle("POST", "/gpt", func(c *gin.Context) {
		var body RequestBody
		if err := c.ShouldBindJSON(&body); err != nil {
			c.JSON(http.StatusOK, gin.H{
				"status":  false,
				"message": "",
				"reason":  "message is empty",
			})
			return
		}
		ChatGPTAPI(c, body.Message)
	})
	err := app.Run(":8001")
	if err != nil {
		panic(err)
	}
}
