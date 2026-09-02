FROM node:24-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm@10.19.0; pnpm i
COPY . .
RUN pnpm build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
