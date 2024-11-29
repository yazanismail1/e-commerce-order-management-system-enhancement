# Task: E-commerce Order Management System Enhancement

This task consists from three parts the first to be is real-time order processing and RESTfull API implementation concepts, the second to be is system design with architecturing, and the third and final part is the database design.

## Part 01 - Node.js or PHP

I decided to go with Node JS where I created the a node server with express JS and implemented the RabbitMQ the code is divided into consumers which represents the channel connection with RabbitMQ, controllers with includes the RESTfull API representation of the suppose logic, validators which includes any validator functions, services which hold the actual services representation needed, index.js which is the entry point and finally the docker compose file.

**Steps to run the application:**

1. create a .env file by renaming the .env.example to be .env (note that this application is dummy and contains no sensitive information do not do this production od real applications)

2. run `docker-compose build`

3. run `docker-compose up -d`

4. to send data to the queue and test that the RabbitMQ consumer work run the send.js file `node consumers/send.js`

## Part 02 - System Design

I created a seperate .md file that includes the task details and my solution. [See documentation](./SystemDesign.md)

## Part 03 - Database Design

I created a seperate .md file that includes the task details and my solution. [See documentation](./DatabaseDesign.md)