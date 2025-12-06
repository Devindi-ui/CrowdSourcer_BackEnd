const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

const userRouter = require('./routers/user_router');
const roleRouter = require('./routers/role_router');
const busRouter = require('./routers/bus_router');
const busTypeRouter = require('./routers/busType_router');
const routeStopRouter = require('./routers/routeStop_router');
const routesRouter = require('./routers/route_router');
const alertRouter = require('./routers/alert_router');
const busAssignmentRouter = require('./routers/busAssignment_router');
const tripRouter = require('./routers/trip_router');
const crowdReportRouter = require('./routers/crowdReport_router');
const favouriteRouteRouter = require('./routers/favouriteRoute_router');
const feedbackRouter = require('./routers/feedback_router');

app.use(express.json());
app.use(cors());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/bus', busRouter);
app.use('/api/v1/busType', busTypeRouter);
app.use('/api/v1/routeStop', routeStopRouter);
app.use('/api/v1/route', routesRouter);
app.use('/api/v1/alert', alertRouter);
app.use('/api/v1/busAssignment', busAssignmentRouter);
app.use('/api/v1/trip', tripRouter);
app.use('/api/v1/crowdReport', crowdReportRouter);
app.use('/api/v1/favouriteRoute', favouriteRouteRouter);
app.use('/api/v1/feedback', feedbackRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});