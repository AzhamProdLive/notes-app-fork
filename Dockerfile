FROM scratch

WORKDIR /app

COPY basic-app/package.json /app

RUN npm install

COPY . /app/

EXPOSE 4000

CMD ["sh", "-c", "cd ./api/ && npx json-server@0.17.4 --watch db.json --port 4000" ]

FROM node:18-alpine

WORKDIR /app

COPY basic-app/package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["sh", "-c", "cd ./basic-app/ && npm start" ]
