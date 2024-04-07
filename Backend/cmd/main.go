package main

import (
	"lru/handler"
	"lru/middleware"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(middleware.EnableCrossDomain)
	router.Use(middleware.Auth)
	handler.SetupApiRouter(router)

	http.ListenAndServe(":8080", router)

}
