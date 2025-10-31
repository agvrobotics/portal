# Setup Guide

```bash
# Install Wrangler
npm i -D wrangler@latest

# Initialize Cloudflare Worker project
npx wrangler init

# Check and use Node version
nvm ls
nvm use 22

# Run worker locally
npx wrangler dev

# Create D1 database (local + remote)
npx wrangler d1 create agv-db

# Execute schema locally
npx wrangler d1 execute agv-db --file=./schema.sql

# Execute schema remotely
npx wrangler d1 execute agv-db --remote --file=./schema.sql

# Test queries locally
npx wrangler d1 execute agv-db --command="SELECT * FROM users;"

# Test queries remotely
npx wrangler d1 execute agv-db --remote --command="SELECT * FROM users;"

# Example API request
curl -X POST https://backend.michaelmachohi.workers.dev/login \
  -H "Content-Type: application/json" \
  -d '{"email":"", "password":""}'

```
