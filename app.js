"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
var producto = require('./controllers/producto');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate');

app.get('/', (request, response) => {
  response.render('index', { title: 'Comma Separated Value Analyzer' });
});

app.get('/csv', (request, response) => {
  response.send({ "rows": calculate(request.query.input) });
});

app.get('/tutu', producto.index);


app.param('entrada', function(req, res, next, entrada) {
  if (entrada.match(/^[a-z_]\w*\.csv$/i)) {
    req.Entrada = entrada;
  } else {
    next(new Error(`<${entrada}> no casa con los requisitos de 'entrada'`));
  }
  next();
});

const Entrada = require('./models/db');

app.get('/mongo/:entrada', function(req, res) {
  console.log(req.Entrada);

  mongoose.connect('mongodb://localhost/prueba');

  let input = new Entrada({
    "name": req.Entrada,
    "content": "test"
  });

  let promesa = Entrada.save(function(err) {
    if (err) {
      console.log(`Hubieron errores:\n${err}`);
      return err;
    }
    console.log(`Saved: ${input}`);
  });

  Promise.resolve(promesa).then((value) => {
    console.log(value);
    mongoose.connection.close();
  });
});

app.get('/find', function(req, res) {
  if (Entrada.find()[req.query.indice] != null)
    req.query.elemento.toggleClass('input');
});

/*// Routes
app.get('/', producto.index)
 
app.get('/producto/:id', producto.show_edit)
 
app.post('/producto/:id', producto.update)
 
app.get('/delete-producto/:id', producto.remove)
 
app.get('/nuevo-producto', producto.create)*/


app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
