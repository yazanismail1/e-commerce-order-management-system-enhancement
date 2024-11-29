const validateOrderUpdate = (data) => {
    const { orderId, status } = data;
    if (!orderId || typeof orderId !== 'string') {
        return 'Invalid or missing orderId';
    }
    if (!status || typeof status !== 'string') {
        return 'Invalid or missing status';
    }
    return null;
};

module.exports = { validateOrderUpdate };