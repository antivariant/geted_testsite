const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());
app.use(express.urlencoded(
    { extended: true }
));

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
            },
            servers: [
                {
                    url: "http://localhost:8080",
                    description: "Test Server"
                },
                {
                    url: "http://antivariant.com",
                    description: "Production server"    
                }
            ]
        }
    },
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




const config = require('./config');

const invoiceRouter = require("./routes/invoice");
const invoiceDetailsRouter = require("./routes/invoiceDetails");
const filmsRouter = require("./routes/film");


app.use("/films", filmsRouter);
app.use("/invoice", invoiceRouter);
app.use("/invoice/details", invoiceDetailsRouter);



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
