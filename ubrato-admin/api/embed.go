package api

import (
	"embed"
	"net/http"
)

//go:embed bundle.yaml
var OpenapiSpec []byte

//go:embed v1
var openapiRefs embed.FS

var OpenapiRefs = http.FS(openapiRefs)
