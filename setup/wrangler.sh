npm i -D wrangler@latest
npx wrangler init
nvm ls
nvm use 22
npx wrangler dev
npx wrangler d1 create agv-db
npx wrangler d1 execute agv-db --file=./schema.sql
npx wrangler d1 execute agv-db --remote --file=./schema.sql #remote
npx wrangler d1 execute agv-db --command="SELECT * FROM users;" #local
npx wrangler d1 execute agv-db --remote --command="SELECT * FROM users;" #remote

curl -X POST https://backend.michaelmachohi.workers.dev/login \
  -H "Content-Type: application/json" \
  -d '{"email":"2025agvrobotics.team@gmail.com", "password":"@team2025"}'

