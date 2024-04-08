package logic

import (
	"errors"
	"fmt"
	"time"
)

const cacheSize = 1024
const eivictionTime = 5

var KeyValueStore = make(map[string]*Node)

type Node struct {
	Key      string
	Value    string
	UnixTime int64
	Next     *Node
	Pre      *Node
}

var Cache *Node = nil

type Lru struct {
}

// function to get the cache
func getNode(val, key string, timeStamp int64) *Node {
	return &Node{
		Value:    val,
		Key:      key,
		UnixTime: timeStamp,
	}
}

// function to set the cache
func (a *Lru) Set(key, val string) error {
	currentUnixSecond := time.Now().Unix()
	// cleanCache(currentUnixSecond)
	UpdateCache(key, val, currentUnixSecond)
	return nil
}

func (a *Lru) CleanCache() {
	fmt.Println("cached clean started")
	timeStamp := time.Now().Unix()
	keyToDelete := []*Node{}
	for _, value := range KeyValueStore {
		if value.UnixTime < timeStamp-eivictionTime {
			keyToDelete = append(keyToDelete, value)
		}
	}
	for _, v := range keyToDelete {
		remove(v)
	}
	fmt.Println("cached clean done")
}

// removeing the cache
func remove(node *Node) {
	delete(KeyValueStore, node.Key)
	if node.Pre == node {
		Cache = nil
	} else if node.Next == nil {
		Cache.Pre = node.Pre
		node.Pre.Next = nil
	} else {
		node.Pre.Next = node.Next
	}
}

// Udating the cache
func UpdateCache(key, val string, currentUnixSecond int64) {
	value, ok := KeyValueStore[key]
	if ok {
		value.UnixTime = currentUnixSecond
		value.Value = val
		KeyValueStore[key] = value
		MoveNodeToHead(value)
		return
	}
	data := getNode(val, key, currentUnixSecond)

	if len(KeyValueStore) < cacheSize {
		if Cache == nil {
			data.Pre = data
		} else {
			data.Pre = Cache.Pre
			Cache.Pre = data
			data.Next = Cache
		}
	} else {
		lastNode := Cache.Pre
		Cache.Pre = data
		data.Next = Cache
		data.Pre = lastNode.Pre
		lastNode.Pre.Next = nil
	}
	Cache = data
	KeyValueStore[key] = data
}

// func to get the cache
func (a *Lru) Get(key string) (string, error) {
	value, ok := KeyValueStore[key]
	if !ok {
		return "", errors.New("key not found")
	}
	currentUnixSecond := time.Now().Unix()
	if currentUnixSecond > value.UnixTime+eivictionTime {
		return "", errors.New("key expired")
	}
	value.UnixTime = currentUnixSecond
	KeyValueStore[key] = value
	MoveNodeToHead(value)
	return value.Value, nil
}

func MoveNodeToHead(node *Node) {
	node.Pre.Next = node.Next
	node.Pre = Cache.Pre
	node.Next = Cache
	Cache = node
}
