# stage - base
FROM node:14.9 as base
WORKDIR /workspace

COPY . .

RUN npm clean-install
RUN npm run lint
RUN npm run build --configuration=production

# stage - final
FROM nginx:1.19-alpine
LABEL maintainer="https://github.com/fredbelotte"

COPY --from=base /workspace/nginx.conf /etc/nginx/nginx.conf
COPY --from=base /workspace/dist/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
