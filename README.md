[![Build Status](https://travis-ci.com/aarong/feedme-util.svg?branch=master)](https://travis-ci.com/aarong/feedme-util)
[![Coverage Status](https://coveralls.io/repos/github/aarong/feedme-util/badge.svg?branch=master)](https://coveralls.io/github/aarong/feedme-util?branch=master)

# Feedme Utilities

Utilities shared by the Feedme [client](https://github.com/aarong/feedme-client)
and [server](https://github.com/aarong/feedme-server).

- Validate Feedme messages
- Serialize feed name/arg combinations into canonical strings
- Calculate MD5 hashes for feed data
- Apply deltas to feed data

The NPM package is ESNext, which enables downstream tree-shaking. Transpilation
occurs downstream.
