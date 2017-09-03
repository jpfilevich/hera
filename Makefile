 # npm = youtu.be/CDQ-WlU8ecs
 # Make; good ol' friend

.PHONY: all build test clean run

FLAGS := --sourceMap -m commonjs -t ES2015 --noImplicitAny --strictNullChecks
MOCHA := ./node_modules/mocha/bin/mocha --no-timeouts

all: build

build:
	@tsc -p src

test:
ifeq ($(UNIT),)
	@tsc -p test && $(MOCHA) test
else
	@tsc $(FLAGS) test/$(UNIT).test.ts && $(MOCHA) test #--grep $(UNIT)
endif
	
tmp:
	@rm -f test/out/download* && tsc $(FLAGS) test/_tmp.ts && nodejs test/_tmp.js

clean-build: 
	@rm -f dist/*

clean-test:
	@rm -f test/*.js test/*.js.map

clean: clean-build clean-test

rebuild: clean build;

run:
	@nodejs dist/app.js