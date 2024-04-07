package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func Auth(ctx *gin.Context) {

	userName, passWord, ok := ctx.Request.BasicAuth()

	if !ok {
		fmt.Println("basic auth missing")
		ctx.JSON(401, nil)
		ctx.Abort()
		return
	}

	if userName == "lru@sonu" && passWord == "12345" {
		ctx.Next()
	} else {
		fmt.Println("basic auth missing")
		ctx.JSON(401, nil)
		ctx.Abort()
		return
	}
}
