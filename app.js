require('dotenv').config();

require("express-async-errors");
const express = require("express");

const app = express();  


app.use(express.json());
const userRoutes = require("./routes/user");

app.use('/api/v1/', userRoutes);
const port = process.env.PORT || 3000;
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found')



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();