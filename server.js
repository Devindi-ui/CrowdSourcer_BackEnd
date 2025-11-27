const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

const userRouter = require('./routers/user_router');
const roleRouter = require('./routers/role_router');
const busRouter = require('./routers/bus_router');
const busTypeRouter = require('./routers/busType_router');

app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/bus', busRouter);
app.use('/api/v1/busType', busTypeRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});