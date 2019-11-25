const express = require('express')
const app = express()
const body_parser = require('body-parser')

app.use(body_parser.urlencoded(
    {extended: true}
))

const mongoClient = require('mongodb').MongoClient
const username = "sanchitcop19";
const uri = "mongodb+srv://" + username + ":" + process.env.PASSWORD + "@pricelistmanager-hnvmq.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 8080
app.set('json spaces', 4);
app.use(express.static("public"));
let store, collection;


function get_updated_store(){
    store = [];
    client.connect(function(err) {
        if (err){
            console.log('Error connecting')
            return;
        }
        collection = client.db("store").collection("price-list")
        var cursor = collection.find({});
        var count = collection.countDocuments();
        cursor.forEach((doc) => {
            //console.log(JSON.stringify(doc, null, 4));
            store.push(doc)
        }, (err) => {
            //console.log(err);
        })
    })
}

function update_store(data){
    collection.insertOne(data);
}

get_updated_store();

app.get('/store', (req, res) => {
    res.json(store)
})

app.get('/search', (req, res) => {
    res.sendFile('public/search.html', {
        root: __dirname
    })
})

app.get('/add', (req, res) => {
    // Make sure to update datastore
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile('public/add.html', {
        root: __dirname
    })
})

function create_object(org, price){
    var object = {}
    object[org] = parseInt(price);
    return object;
}

app.post('/add', (req, res) => {
    let submission = req.body;
    let entry = {}
    console.log(submission)
    entry["spec"] = submission.specinput;
    entry["prices"] = create_object(submission.org, submission.price);
    update_store(entry);
  res.send('Successful');
})

app.get('/', (req, res) => {
    res.sendFile('public/index.html', {
        root: __dirname
    })
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
})