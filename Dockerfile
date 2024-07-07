FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm@8.15.7; pnpm i
COPY . .
RUN pnpm build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
