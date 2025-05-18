npm i -D wrangler@latest
npx wrangler init
nvm ls
nvm use 22
npx wrangler dev
npx wrangler d1 create agv-db
npx wrangler d1 execute agv-db --file=./schema.sql
npx wrangler d1 execute agv-db --command="SELECT * FROM users;"

