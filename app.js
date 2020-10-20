
const express = require("express");
const morgan = require('morgan');

const tourRouter = require('./Routes/tourRoutes')
const userRouter = require('./Routes/userRoutes')

const app = express();

///////////////
//Middleware
///////////////

console.log(process.env.node_env)
if(process.env.node_env === 'deployment') {
    app.use(morgan('dev'));
}


app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('hello middleware')
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date(). toISOString();
    next();
})


app.use( '/api/v1/tours', tourRouter)

app.use( '/api/v1/User', userRouter)



module.exports = app
