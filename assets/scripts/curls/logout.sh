#!/bin/bash
#curl "http://httpbin.org/post" \
curl "http://tic-tac-toe.wdibos.com/sign-out/id=$id" \
  --include \
  --request DELETE


# data output from curl doesn't have a trailing newline
echo
