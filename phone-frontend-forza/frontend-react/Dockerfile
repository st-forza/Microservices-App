FROM node:14 
FROM python:alpine


# Create app directory
WORKDIR /app


COPY ./client/package*.json ./

#RUN yarn install

# copy all files into the image
COPY ./client/ .
RUN pip install flask
RUN pip install flask-mysql

EXPOSE 3000

CMD python ./App.py
#CMD ["yarn", "run", "start"]
