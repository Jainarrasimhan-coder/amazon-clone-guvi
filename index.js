import express from 'express';
// import data from './data.js';
import userRouter from './routers/userRouter.js';
import Connection from './database/db.js';
import bodyParser from 'body-parser';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import path from 'path';
import uploadRouter from './routers/uploadRouter.js';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
Connection();



app.use('/api/uploads', uploadRouter);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
);

// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});