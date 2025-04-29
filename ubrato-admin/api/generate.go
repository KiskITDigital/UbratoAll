package api

// Generate full API from OpenAPI spec
//go:generate ../bin/tools/ogen --loglevel error --clean --config ../.ogen.yml --target ./gen/v1 openapi.yaml
