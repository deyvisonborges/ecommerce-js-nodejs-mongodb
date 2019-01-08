const expressValidator = require('./');
const { body, checkSchema, oneOf, validationResult } = require('./check');
const { matchedData } = require('./filter');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
// app.use([
//   body('id')
//     // .customSanitizer(value => {
//     //   console.log(value);
//     //   return value._id;
//     // })
//     .toInt(),
// ], (req, res) => {
//   const data = matchedData(req, { onlyValidData: false });
//   const result = validationResult(req);

//   res.json({
//     data,
//     errors: result.array()
//   });
// });

app.use(expressValidator());
app.use((req, res) => {
  req.checkBody('id').custom(value => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  });

  req.getValidationResult().then(result => {
    res.json({
      errors: result.mapped()
    });
  });
});

app.listen(3001);