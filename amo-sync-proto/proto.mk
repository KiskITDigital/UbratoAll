AMO_SYNC_PROTO_FILES := $(shell find $(AMO_SYNC_PROTO_PATH) -type f -name '*.proto')
AMO_SYNC_PROTO_FILES := $(patsubst $(AMO_SYNC_PROTO_PATH)/%,%,$(AMO_SYNC_PROTO_FILES))
AMO_SYNC_PROTO_MODULES := $(foreach file,$(AMO_SYNC_PROTO_FILES),$(shell echo $(file)=$(AMO_SYNC_PROTO_OUT_MODULE)/$(dir $(file)) | sed 's|/./||g; s|/$$||')) # :(

.PHONY: amo-sync-proto.generate.go
amo-sync-proto.generate.go:
	mkdir -p $(AMO_SYNC_PROTO_OUT)
	rm -rf $(AMO_SYNC_PROTO_OUT)/*
	protoc --proto_path=$(AMO_SYNC_PROTO_PATH) \
		--go_out=$(AMO_SYNC_PROTO_OUT) \
		--go-grpc_out=$(AMO_SYNC_PROTO_OUT) \
		--go_opt=paths=source_relative \
		--go-grpc_opt=paths=source_relative \
		$(foreach module,$(AMO_SYNC_PROTO_MODULES),--go_opt=M$(module)) \
		$(foreach module,$(AMO_SYNC_PROTO_MODULES),--go-grpc_opt=M$(module)) \
		$(AMO_SYNC_PROTO_FILES)
