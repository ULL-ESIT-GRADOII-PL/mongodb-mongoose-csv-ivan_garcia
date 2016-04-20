(function() {
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/chuchu');
  const EntradaSchema =  //Introducimos el esquema csv
     mongoose.Schema({
        "name": { type: String, unique: true },
        "content": String
    });

  const Entrada = mongoose.model("Entrada", EntradaSchema);

 let c1 = new Entrada({
        "name": "entrada1.csv",
        "content": `"producto",           "precio"
                    "camisa",             "4,3"
                    "libro de O\"Reilly", "7,2"`
    });
    let c2 = new Entrada({
        "name": "entrada2.csv",
        "content": `"producto",           "precio"  "fecha"
                    "camisa",             "4,3",    "14/01"
                    "libro de O\"Reilly", "7,2"     "13/02"`
    });
    let c3 = new Entrada({
        "name": "entrada3.csv",
        "content": `"edad",  "sueldo",  "peso"
                    ,         "6000€",  "90Kg"
                    47,       "3000€",  "100Kg"`

    });

  let p1 = c1.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c1}`);
  });

  let p2 = c2.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c2}`);
  });

  let p3 = Entrada.create(c3, function (err, x) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved p3: ${x}`);
  });

  Promise.all([p1, p2, p3]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
    mongoose.connection.close(); 
  });
})();
