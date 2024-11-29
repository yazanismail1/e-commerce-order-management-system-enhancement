require('dotenv').config();
const amqp = require('amqplib');
const { processOrders } = require('../services/processOrders');

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;
const BATCH_SIZE = process.env.BATCH_SIZE;
const RETRY_LIMIT = process.env.RETRY_LIMIT;

let connection, channel;

const consumeOrders = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);

        let batch = [];
        channel.ack
        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg) {
                
                batch.push({ 
                    msg, 
                    retries: msg.properties.headers['x-retries'] || 0, 
                    content: msg.content 
                });

                if (batch.length >= BATCH_SIZE) {
                    const batchToProcess = [...batch];
                    batch = [];
                    // TODO: Implement the processOrders function
                    await processOrders(channel, batchToProcess, RETRY_LIMIT);
                }
            }
        });
    } catch (error) {
        console.error("Error setting up consumer:", error.message);
        if (connection) {
            await connection.close();
        }
        process.exit(1);
    }
}


//* Closing the connection
process.on('SIGINT', async () => {
    console.log("Closing RabbitMQ connection...");
    if (connection) {
        await connection.close();
    }
    process.exit(0);
});

consumeOrders();