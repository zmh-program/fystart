package main

import (
	"database/sql"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
)

type StorageRequestBody struct {
	ChatGPT    bool   `json:"chatgpt" required:"true"`
	Quote      bool   `json:"quote" required:"true"`
	ToolBox    bool   `json:"toolbox" required:"true"`
	About      bool   `json:"about" required:"true"`
	ExactTime  bool   `json:"exactTime" required:"true"`
	FocusInput bool   `json:"focusInput" required:"true"`
	Language   string `json:"language" required:"true"`
	Background string `json:"background" required:"true"`
	Stamp      int64  `json:"stamp" required:"true"`
}

func GetStorage(db *sql.DB, id int) *StorageRequestBody {
	var text string
	if err := db.QueryRow("SELECT data FROM storage WHERE id = ?", id).Scan(&text); err != nil {
		return nil
	}

	var data StorageRequestBody
	if err := json.Unmarshal([]byte(text), &data); err != nil {
		return nil
	}

	return &data
}

func SaveStorage(db *sql.DB, id int, data StorageRequestBody) bool {
	res, err := json.Marshal(data)
	if err != nil {
		return false
	}

	if _, err := db.Exec("UPDATE storage SET data = ? WHERE id = ?", string(res), id); err != nil {
		return false
	}
	return true
}

func SyncStorageAPI(c *gin.Context) {
	var body StorageRequestBody
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status":  false,
			"message": "Bad Request",
		})
		return
	}

	user := c.MustGet("user").(string)
	if user == "" {
		c.JSON(http.StatusOK, gin.H{
			"status":  false,
			"message": "Bad Request",
		})
		return
	}

	db := c.MustGet("db").(*sql.DB)

	var id int
	if err := db.QueryRow("SELECT id FROM auth WHERE username = ?", user).Scan(&id); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status":  false,
			"message": "Internal Server Error",
			"error":   err.Error(),
		})
		return
	}

	data := GetStorage(db, id)
	if data == nil {
		// create new storage
		if !SaveStorage(db, id, body) {
			c.JSON(http.StatusOK, gin.H{
				"status":  false,
				"message": "Internal Server Error",
				"error":   "save storage failed",
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status": true,
				"sync":   false,
				"data":   body,
			})
		}
		return
	}

	if body.Stamp < data.Stamp {
		// sync new data
		c.JSON(http.StatusOK, gin.H{
			"status": true,
			"sync":   true,
			"data":   data,
		})
		return
	}

	// save storage
	if !SaveStorage(db, id, body) {
		c.JSON(http.StatusOK, gin.H{
			"status":  false,
			"message": "Internal Server Error",
			"error":   "save storage failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": true,
		"sync":   false,
		"data":   body,
	})
}
