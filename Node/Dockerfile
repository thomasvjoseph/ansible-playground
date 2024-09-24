FROM node:18-alpine
# Set build arguments for secrets
ARG SECRET_NAME
ARG AWS_REGION

# Set environment variables from the build arguments
ENV SECRET_NAME=${SECRET_NAME}
ENV AWS_REGION=${AWS_REGION}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node","secrets.js"]