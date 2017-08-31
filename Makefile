 # npm = youtu.be/CDQ-WlU8ecs
 # Make; good ol' friend

.PHONY: all build test clean

all: build

build:
	@tsc -p src

test:
	@tsc -p test && ./node_modules/mocha/bin/mocha test

clean-build: 
	@rm -f build/*

clean-test:
	@rm -f test/*.js test/*.js.map

clean: clean-build clean-test

rebuild: clean build;