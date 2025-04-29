TOOLS_PATH=bin/tools

REDOCLY_VERSION=1.25.3

ogen=${TOOLS_PATH}/ogen

$(ogen): Makefile
	GOBIN=`pwd`/$(TOOLS_PATH) go install github.com/ogen-go/ogen/cmd/ogen@v1.0.0

generate/api: $(ogen) ## Generate API packages using 'ogen' accordingly OpenAPIv3 specifications
	go generate -run 'ogen' ./api/...
	docker run --rm -v `pwd`:/spec redocly/cli:$(REDOCLY_VERSION) bundle ./api/openapi.yaml > ./api/bundle.yaml

setup: $(ogen)
