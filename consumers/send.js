const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

async function sendOrders() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'orders';
  await channel.assertQueue(queue, { durable: true });

  for (let i = 1; i <= 500; i++) {
    const order = { id: i, item: `${uuidv4()}`, quantity: Math.ceil(Math.random() * 10) };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
  }

  console.log("Orders sent to queue.");
  await channel.close();
  await connection.close();
}

sendOrders();