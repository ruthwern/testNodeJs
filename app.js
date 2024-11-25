const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','*');
//     if(req.method === 'OPTIONS')
//         {
//             res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
//             return res.status(200).json({});
//         }
// });


// Example route (add your routes here)
app.use('/score', (req, res) => {
    res.status(200).json({
        message: `score-route-Handled by process: ${process.pid}`,
    });
});


app.use((req,res,next)=>{

    const error = new Error('not found');

    error.status = 404;
    next(error);
 });

 app.use((error,req,res,next)=>{
    res.status (error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
 });

 module.exports = app;