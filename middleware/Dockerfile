FROM node:16.19.1-slim
WORKDIR /app
COPY . ./
COPY start.sh /usr/bin/
RUN apt-get update -y; \
    apt-get install software-properties-common -y; \
    apt-get install python3 -y
RUN npm install
RUN chmod +x /usr/bin/start.sh
ENTRYPOINT start.sh
