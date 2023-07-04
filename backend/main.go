package main

import "github.com/gin-gonic/gin"

func main() {
	app := gin.Default()
	err := app.Run(":8080")
	if err != nil {
		return
	}
}
