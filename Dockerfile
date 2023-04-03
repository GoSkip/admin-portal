FROM nginx:alpine

COPY . /code/

WORKDIR /code

EXPOSE 80

RUN set -eux \
  & apk add \
  --no-cache \
  nodejs \
  yarn

RUN yarn && \
  yarn build && \
  mv dist/* /usr/share/nginx/html/
