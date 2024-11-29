require('dotenv').config();
const express = require('express'); 
const server = express();
const PORT = process?.env?.PORT || 3030;
const cors = require('cors');
const { orderUpdate } = require('./controllers/updateOrder');
server.use(cors());
server.use(express.json());



server.get('/',(req,res)=>{
    res.send(`Hi from the home route \n`);
})

server.post('/api/v1/orders/status-update', async (req, res) => {
    await orderUpdate(req, res);
})

server.post('/api/v1/orders/progress/:id', async (req, res) => {
    // TODO: Implement order progress tracking by getting it from the database
})




server.listen(PORT, () => {
    console.log(`Hello, I am listening in ${PORT}`);
})