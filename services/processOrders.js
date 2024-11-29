const processOrders = async (channel, orders, RETRY_LIMIT) => {

    console.log(`Processing ${orders.length} orders...`);
    orders.forEach(order => {
        try {
            console.log(`Processing order: ${order.id}`);
            order.content = JSON.parse(order.content.toString()); 
            console.log(order);
            console.log("=================================");
            // TODO: Implement updating inventory
            
        } catch (error) {
            console.error('Error processing order:', error);
            
            let retries = order.retries;
            if (retries < RETRY_LIMIT) {
                msg.properties.headers['x-retries'] = retries + 1;
                channel.nack(msg, false, true);
              } else {
                console.error('Message failed after max retries:', msg.content.toString());
                // TODO: Implement handling failed orders
                channel.ack(msg); 
              }
        }
    });
};

module.exports = { processOrders };