## Makefile for testing; does this make sense? use gulp?

.PHONY: test test_server test_webapp

.DEFAULT: test

test: test_server test_webapp

test_server:
	(cd server && npm test)

test_webapp:
	echo Test all the webapp things!

