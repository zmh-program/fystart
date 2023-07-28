package main

import (
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

type RequestBody struct {
	Message string `json:"message" required:"true"`
}

func main() {
	viper.SetConfigFile("config.yaml")
	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}

	if viper.GetBool("debug") {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	app := gin.Default()

	{
		app.Use(CORSMiddleware())
		app.Use(BuiltinMiddleWare(ConnectMySQL(), ConnectRedis()))
		app.Use(AuthMiddleware())
	}
	{
		app.POST("/login", LoginAPI)
		app.POST("/state", StateAPI)
		RegisterChatGPTAPI(app)
	}

	err := app.Run(":8001")
	if err != nil {
		panic(err)
	}
}
