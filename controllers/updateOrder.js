const { validateOrderUpdate } = require("../validators/validateOrderUpdate");

const orderUpdate = async (req, res) => {
    console.log(req.body);
    const validationError = validateOrderUpdate(req.body);
    if (validationError) {
        res.status(400).json({ error: validationError });
    };

    const orderUpdate = {
        orderId: req.body.orderId,
        status: req.body.status,
        timestamp: new Date().toISOString(),
    };

    // TODO: Implement updating the order status in the database

    res.send({ message: 'Order status updated successfully', orderUpdate });
}

module.exports = { orderUpdate };