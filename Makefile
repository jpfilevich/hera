 # npm = youtu.be/CDQ-WlU8ecs
 # Make; good ol' friend

.PHONY: all build test clean run

all: build

build:
	@tsc -p src

test:
	@tsc -p test && ./node_modules/mocha/bin/mocha test

clean-build: 
	@rm -f dist/*

clean-test:
	@rm -f test/*.js test/*.js.map

clean: clean-build clean-test

rebuild: clean build;

run:
	@nodejs dist/app.js