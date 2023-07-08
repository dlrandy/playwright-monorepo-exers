npx create-next-app apps/blog --ts --use-npm

npm run test -w=@playwright-monorepo/egg-api
npm run build -w=@playwright-monorepo/utils

npm run build -ws

npx playwright codegen -o tests/codegen.spec.ts

npx playwright show-report



