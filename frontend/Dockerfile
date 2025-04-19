FROM node:18

WORKDIR /frontend

RUN apt-get update \
    && apt-get install -y \
        git \
        curl \
        vim \
    && rm -rf /var/lib/apt/lists/*


COPY package*.json .

RUN npm install

CMD ["npm", "run", "dev"]
