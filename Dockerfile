FROM node:slim AS app

RUN apt-get update && apt-get install curl gnupg -y \
    && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install google-chrome-stable -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PORT=3000

EXPOSE 3000

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . .

RUN npm install

COPY . . 

USER root

CMD ["yarn", "start"]
