package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"lru/core/service/driver"

	"github.com/gin-gonic/gin"
)

func Addkey(svc driver.Lru) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		response := map[string]string{
			"msg":  "key added successfully",
			"code": "200",
		}
		body, err := io.ReadAll(ctx.Request.Body)
		if err != nil {
			fmt.Println("error in getting request body ERROR :", err)
			response["msg"] = "error in getting request body"
			response["code"] = "400"
			ctx.JSON(400, response)
			return
		}
		request := map[string]string{}

		err = json.Unmarshal(body, &request)
		if err != nil {
			fmt.Println("error in Unmarshal request ERROR :", err)
			response["msg"] = "error in Unmarshal request"
			response["code"] = "400"
			ctx.JSON(400, response)
			return
		}
		key := request["key"]
		val := request["val"]
		if key == "" || val == "" {
			fmt.Println("invalid key value ERROR :", err)
			response["msg"] = "invalid key value"
			response["code"] = "400"
			ctx.JSON(200, response)
			return
		}
		err = svc.Set(key, val)
		if err != nil {
			fmt.Println("invalid key value ERROR :", err)
			response["msg"] = "service unavailable"
			response["code"] = "500"
			ctx.JSON(200, response)
			return
		}
		ctx.JSON(200, response)
	}
}

func GetKey(svc driver.Lru) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		response := map[string]string{
			"key":   "",
			"value": "",
			"msg":   "success",
			"code":  "200",
		}
		key := ctx.Query("key")

		if key == "" {
			response["msg"] = "invalid key value"
			response["code"] = "400"
			ctx.JSON(200, response)
			return

		}
		value, err := svc.Get(key)
		if err != nil {
			fmt.Println("error in getting value :", err)
			response["msg"] = err.Error()
			response["code"] = "400"
			ctx.JSON(200, response)
			return

		}
		response["value"] = value
		response["key"] = key
		ctx.JSON(200, response)
	}
}
