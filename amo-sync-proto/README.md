# Proto files for amo sync

## Generate for golang

```bash
make ano-sync-proto.generate.go
```

## Integration

```bash
git submodule add git@gitlab.ubrato.ru:ubrato/amo-sync-proto.git
echo "include ./amo-sync-proto/proto.mk" >> Makefile
echo "AMO_SYNC_PROTO_PATH = ./proto" >> Makefile
echo "AMO_SYNC_PROTO_OUT = ./some/path" >> Makefile
echo "AMO_SYNC_PROTO_OUT_MODULE = git.ubrato.ru/some/path/to/pkg" >>
```
