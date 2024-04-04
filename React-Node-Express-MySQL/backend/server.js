// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors());

app.use('/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
