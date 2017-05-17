#!/bin/bash
#curl "http://httpbin.org/post" \
curl "http://tic-tac-toe.wdibos.com/sign-in/35" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "acon@example",
      "password": "secret"
    }
  }'

# data output from curl doesn't have a trailing newline
echo
