const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
// const db = require('./models/Index');
const indexRouter = require('./routes/Index');
const path = require('path')
const app = express();
const port = process.env.PORT || 80;


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet()); // need to add more configurations
app.use(cors());



app.use('/api', indexRouter);

app.get('/', (req, res) => {
    res.status(200).send(`PDF Editor server is running on Node js ¯\\_(ツ)_/¯`);

});

app.listen(port, () => console.log(`Server is running on port ${port}`));