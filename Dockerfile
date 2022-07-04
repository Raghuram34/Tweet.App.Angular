# Stage 1
FROM node:12-alpine as client-build
WORKDIR /app
COPY tweet-app/package.json /app
RUN npm install

# Stage 2
COPY tweet-app/. /app
RUN npm run build:prod

#Stage 3
FROM node:12-alpine as server-build
WORKDIR /app
COPY tweet-app-server/package.json /app
RUN npm install

# Stage 4
COPY --from=client-build /app/dist/tweet-app /app/dist/tweet-app
COPY tweet-app-server/index.js /app

# Stage 5
EXPOSE 3030
CMD [ "node", "index.js" ]