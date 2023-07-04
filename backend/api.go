package main

import (
	"github.com/spf13/viper"
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
	})
	if err != nil {
		return "", err
	}
	data := res.(map[string]interface{})["choices"].([]interface{})[0].(map[string]interface{})["message"].(map[string]interface{})["content"]
	return data.(string), nil
}
