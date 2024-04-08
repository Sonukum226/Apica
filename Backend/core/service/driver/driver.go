package driver

import "lru/core/service/logic"

type Lru interface {
	Set(key string, value string) error
	Get(key string) (value string, err error)
	CleanCache()
}

func NewLru() Lru {
	return &logic.Lru{}
}
