require('dotenv').config()
const express = require('express');
const seqielize = require('./app/config/db.config')
const models = require('./app/models/App.models.js')
const router = require('./app/routes/index')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./app/middleware/errorHandling')
const PORT = 5000
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler)

const start = async () => {
    try {
        await seqielize.authenticate()
        app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start()