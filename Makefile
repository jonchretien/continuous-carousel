BIN = ./node_modules/.bin
DIST = dist
GREEN = \033[0;32m
NO_COLOR = \033[0m

# --------------------------
# Build Tasks
# --------------------------

build: test clean make_dir copy min_css min_js

clean:
	rm -rf $(DIST)/
	@echo "${GREEN}Removed old build directory.${NO_COLOR}\n"

copy:
	cp js/infinitecarousel.js $(DIST)/infinitecarousel.js
	cp css/infinitecarousel.css $(DIST)/infinitecarousel.css
	@echo "${GREEN}Copied files.${NO_COLOR}\n"

make_dir:
	mkdir $(DIST)
	@echo "${GREEN}Created new directories.${NO_COLOR}\n"

min_css:
	$(BIN)/cleancss -o $(DIST)/infinitecarousel.min.css $(DIST)/infinitecarousel.css
	@echo "${GREEN}Minified CSS.${NO_COLOR}\n"

min_js:
	$(BIN)/uglifyjs $(DIST)/infinitecarousel.js --mangle --compress -o $(DIST)/infinitecarousel.min.js
	@echo "${GREEN}Minified JavaScript.${NO_COLOR}\n"

# --------------------------
# Test
# --------------------------

test:
	@jshint --verbose js/infinitecarousel.js --config .jshintrc
	@echo "${GREEN}Linted JavaScript files.${NO_COLOR}\n"