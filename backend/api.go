package main

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"github.com/spf13/viper"
	"net/http"
	"strings"
	"time"
)

type ChatGPTMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

func GetResponse(message string) (string, error) {
	res, err := Post("https://api.openai.com/v1/chat/completions", map[string]string{
		"Content-Type":  "application/json",
		"Authorization": "Bearer " + viper.GetString("api_key"),
	}, map[string]interface{}{
		"model": "gpt-3.5-turbo-16k",
		"messages": []ChatGPTMessage{
			{
				Role:    "user",
				Content: message,
			},
		},
		"max_tokens": 150,
	})
	if err != nil {
		return "", err
	}
	data := res.(map[string]interface{})["choices"].([]interface{})[0].(map[string]interface{})["message"].(map[string]interface{})["content"]
	return data.(string), nil
}

func GetResponseWithCache(c context.Context, message string) (string, error) {
	res, err := Cache.Get(c, fmt.Sprintf(":chatgpt:%s", message)).Result()
	if err != nil || len(res) == 0 {
		res, err := GetResponse(message)
		if err != nil {
			return "There was something wrong...", err
		}
		Cache.Set(c, fmt.Sprintf(":chatgpt:%s", message), res, time.Hour*6)
		return res, nil
	}
	return res, nil
}

func ChatGPTAPI(c *gin.Context, message string) {
	message = strings.TrimSpace(message)
	if len(message) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"status":  false,
			"message": "",
			"reason":  "message is empty",
		})
		return
	}
	res, err := GetResponseWithCache(c, message)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status":  false,
			"message": res,
			"reason":  err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status":  true,
		"message": res,
		"reason":  "",
	})
}

func RegisterChatGPTAPI(app *gin.Engine) {
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
}

func GithubExploreAPI(c *gin.Context) {
	resp, err := GetRandomPopularRepoWithCache(c, c.MustGet("cache").(*redis.Client))

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": false,
			"data":   nil,
			"reason": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": true,
		"data":   resp,
		"reason": "",
	})
}
