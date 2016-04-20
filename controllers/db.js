(function() {
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/chuchu');
  const CardSchema =  //Introducimos el esquema csv
     mongoose.Schema({
        "name": { type: String, unique: true },
        "content": String
    });

  const Card = mongoose.model("Card", CardSchema);

  /*let c1 = new Card({"rank":"ace", "suit":"spades ♠",   "chuchu": [{a: "hello", b: "world!"}]});
  let c2 = new Card({"rank":"2",   "suit":"hearts ♥",   "chuchu": [{a: "hola", b: "mundo"}]});
  let c3 = new Card({"rank":"3",   "suit":"clubs ♣",    "chuchu": [{a: "hola", b: "mundo"}]});
  let c4 = new Card({"rank":"4",   "suit":"diamonds ♦", "chuchu": [{a: "hola", b: "mundo"}]});*/
 let c1 = new Card({
        "name": "entrada1.csv",
        "content": `"producto",           "precio"
                    "camisa",             "4,3"
                    "libro de O\"Reilly", "7,2"`
    });
    let c2 = new Card({
        "name": "entrada2.csv",
        "content": `"producto",           "precio"  "fecha"
                    "camisa",             "4,3",    "14/01"
                    "libro de O\"Reilly", "7,2"     "13/02"`
    });
    let c3 = new Card({
        "name": "entrada3.csv",
        "content": `"edad",  "sueldo",  "peso"
                    ,         "6000€",  "90Kg"
                    47,       "3000€",  "100Kg"`

    });

  let p1 = c1.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c1}`);
  });

  let promesa2 = c2.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c2}`);
  });

  let promesa3 = Card.create(c3, function (err, x) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved promesa3: ${x}`);
  });

  Promise.all([p1, promesa2, promesa3]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
    mongoose.connection.close(); 
  });
})();
