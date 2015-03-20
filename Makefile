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
	cp js/infinite-carousel.js $(DIST)/infinite-carousel.js
	cp css/infinite-carousel.css $(DIST)/infinite-carousel.css
	@echo "${GREEN}Copied files.${NO_COLOR}\n"

make_dir:
	mkdir $(DIST)
	@echo "${GREEN}Created new directories.${NO_COLOR}\n"

min_css:
	$(BIN)/cleancss -o $(DIST)/infinite-carousel.min.css $(DIST)/infinite-carousel.css
	@echo "${GREEN}Minified CSS.${NO_COLOR}\n"

min_js:
	$(BIN)/uglifyjs $(DIST)/infinite-carousel.js --mangle --compress --comments -o $(DIST)/infinite-carousel.min.js
	@echo "${GREEN}Minified JavaScript.${NO_COLOR}\n"

# --------------------------
# Test
# --------------------------

test:
	@jshint --verbose js/infinite-carousel.js --config .jshintrc
	@echo "${GREEN}Linted JavaScript files.${NO_COLOR}\n"