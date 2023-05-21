FROM node:20.0.0-slim as base
WORKDIR /app
COPY ./src src
COPY public public
COPY package.json package-lock.json tsconfig.json ./
RUN npm install
RUN npm run build

FROM nginx:1.24.0-bullseye
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
