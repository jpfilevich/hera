 # npm = youtu.be/CDQ-WlU8ecs
 # Make; good ol' friend

.PHONY: all build test clean run

all: build

build:
	@tsc -p src

test:
ifeq ($(UNIT),)
	@tsc -p test && ./node_modules/mocha/bin/mocha test
else
	@tsc -p test && ./node_modules/mocha/bin/mocha test --grep $(UNIT)
endif

clean-build: 
	@rm -f dist/*

clean-test:
	@rm -f test/*.js test/*.js.map

clean: clean-build clean-test

rebuild: clean build;

run:
	@nodejs dist/app.js