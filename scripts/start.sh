case "$OSTYPE" in
  msys*)    npm run start:win ;;
  *)        npm run start:default ;;
esac