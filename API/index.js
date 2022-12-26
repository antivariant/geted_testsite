const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded(
    { extended: true }
));
app.use(cors()); //enable all CORS requests

// https://swagger.io/specification/#openapi-object
// https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "Film Store API",
            description: "API for Get Manual QA Course",
            version: "1.0",
            contact: {
                name: "Igor Gromov",
                url: "http://www.linkedin.com/in/igor-gromov-15043883",
                email: "gromov.i@oulook.com"
            }
        },
        servers: [
            {
                url: `${process.env.URL_PRODUCTION}/api/`,
                description: "Production server"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




const config = require('./config');

const orderRouter = require("./routes/order");
const orderDetailsRouter = require("./routes/orderDetails");
const filmsRouter = require("./routes/film");
const usersRouter = require("./routes/user");
const pricelistRouter = require("./routes/pricelist");

app.use("/user", usersRouter);
app.use("/film", filmsRouter);
app.use("/order", orderRouter);
app.use("/order-details", orderDetailsRouter);
app.use("/pricelist", pricelistRouter);



/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});



const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
