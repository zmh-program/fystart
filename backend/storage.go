package main

import "github.com/gin-gonic/gin"

type StorageRequestBody struct {
	ChatGPT    bool   `json:"chatgpt" required:"true"`
	Quote      bool   `json:"quote" required:"true"`
	ToolBox    bool   `json:"toolbox" required:"true"`
	About      bool   `json:"about" required:"true"`
	ExactTime  bool   `json:"exactTime" required:"true"`
	FocusInput bool   `json:"focusInput" required:"true"`
	Language   string `json:"language" required:"true"`
	Background string `json:"background" required:"true"`
}

func SaveStorageAPI(c *gin.Context) {

}
