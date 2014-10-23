REPORTER = tap 

test:
	@NODE_ENV=test node seed_bugs > /dev/null
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER)

test-w:
	NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--growl \
		--watch

test-cov: lib-cov
		INSTINCT_COV=1 $(MAKE) test REPORTER=html-cov > reports/coverage.html

lib-cov:
		jscoverage lib lib-cov

.PHONY: test test-w