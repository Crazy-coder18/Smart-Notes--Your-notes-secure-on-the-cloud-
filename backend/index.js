const connectTOmongo = require("./db");
const express = require('express');
const app = express();
const jwt=require("jsonwebtoken")
const port = 5000;
const hostname = "localhost"; 
const cors=require('cors');

connectTOmongo();
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
