const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
require('dotenv').config(path.join(__dirname, './.env'));

// import top-level middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
