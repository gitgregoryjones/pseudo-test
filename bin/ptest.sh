#!/bin/bash

        killall node

        PORT="${PORT:-3000}"

        echo 'Starting local server at http://localhost and PORT' $PORT

        node app.js &
        sleep 2
        node node_modules/pseudo-test/app.js
        killall node
