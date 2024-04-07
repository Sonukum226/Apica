package handler

import (
	"lru/core/service/driver"

	"github.com/gin-gonic/gin"
)

func SetupApiRouter(engine *gin.Engine) {

	router := engine.Group("/lru")

	service := driver.NewLru()

	router.POST("/add", Addkey(service))
	router.GET("/get", GetKey(service))

}
