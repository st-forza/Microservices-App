
FROM node:14

# Create app directory
WORKDIR /app


COPY ./server/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


# copy all files into the image
COPY ./server/ .

EXPOSE 5000

CMD ["node","server.js"]
