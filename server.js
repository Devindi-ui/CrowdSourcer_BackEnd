const express = require('express');
require('dotenv').config();

const app = express();

const userRouter = require('./routers/user_router');
const roleRouter = require('./routers/role_router');

app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});