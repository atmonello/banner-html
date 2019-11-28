const express = require('express');
const path = require('path');
const http = require('http');


const app = express();

const server = http.Server(app);

app.use(express.json());
app.use('/products', express.static(path.resolve(__dirname, 'products.json')));

server.listen(3000);
