const {readFileSync} = require('fs');
const MongoClient = require('mongodb').MongoClient;
const store = JSON.parse(readFileSync('public/store.json'))
const uri = "mongodb+srv://sanchitcop19:" + process.env.PASSWORD + "@pricelistmanager-hnvmq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("store").collection("price-list");
    console.log(err);
    console.log(store);
    collection.insertMany(
        store
    );
  // perform actions on the collection object
  client.close();
});

