# makefile
# instructions to build and serve the files

target?="math"

dev:
	@rm -rf build/
	@mkdir -p build/

	@node --no-deprecation scripts/dev.js ${target}
