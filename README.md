[![Build Status](https://travis-ci.com/aarong/feedme-util.svg?branch=master)](https://travis-ci.com/aarong/feedme-util)
[![Coverage Status](https://coveralls.io/repos/github/aarong/feedme-util/badge.svg?branch=master)](https://coveralls.io/github/aarong/feedme-util?branch=master)

# Feedme Utilities

Various Javascript utilities related to the
[Feedme specification](https://github.com/aarong/feedme-client).

Includes functionality to:

- Validate Feedme messages
- Serialize feed name/argument combinations into canonical strings
- Calculate MD5 hashes for feed data
- Apply deltas to feed data

The published NPM package is in ESNext, which enables downstream tree-shaking.
Transpilation occurs downstream.
