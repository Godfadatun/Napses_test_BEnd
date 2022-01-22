FROM node:16
WORKDIR /Users/danieladegoke/Desktop/tutorials/caborn/starship-test
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
RUN npm run build
CMD ["node", "build/index.js"]