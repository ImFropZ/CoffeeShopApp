FROM node:18

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD [ "npm", "run", "dev", "--", "--host" ]