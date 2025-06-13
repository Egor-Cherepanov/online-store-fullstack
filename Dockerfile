FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/Online-store-frontend
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/online-store-backend
RUN npm i

EXPOSE 3001

CMD [ "node", "app.js"]



