FROM node:lts-alpine as builder

COPY package.json ./
RUN yarn
RUN mkdir /app-ui
RUN mv ./node_modules ./app-ui
WORKDIR /app-ui
COPY . .

RUN yarn build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app-ui/dist /usr/share/nginx/html
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
