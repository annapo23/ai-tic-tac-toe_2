const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, './public')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
