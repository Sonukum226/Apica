package handler

import (
	"lru/core/service/driver"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-co-op/gocron"
)

func SetupApiRouter(engine *gin.Engine) {

	router := engine.Group("/lru")

	service := driver.NewLru()

	s := getScheduler(service)
	s.StartAsync()

	router.POST("/add", Addkey(service))
	router.GET("/get", GetKey(service))

}

func getScheduler(service driver.Lru) *gocron.Scheduler {
	s := gocron.NewScheduler(time.Local)
	s.Every(5).Seconds().Do(func() {
		service.CleanCache()
	})
	return s
}
