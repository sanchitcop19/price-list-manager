const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const username = "sanchitcop19";
const uri = "mongodb+srv://" + username + ":" + process.env.PASSWORD + "@pricelistmanager-hnvmq.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 8080
app.set('json spaces', 4);
app.use(express.static("public"));
let store = [];
client.connect(err => {
    if (err){
        return;
    }
    const collection = client.db("store").collection("price-list")
    var cursor = collection.find({});
    cursor.forEach((doc) => {
        //console.log(JSON.stringify(doc, null, 4));
        store.push(doc)
    }, (err) => {
        //console.log(err);
    })
})

app.get('/store', (req, res) => {
    res.json(store)
})

app.get('/search', (req, res) => {
    res.sendFile('public/search.html', {
        root: __dirname
    })
})

app.get('/add', (req, res) => {
    res.sendFile('public/add.html', {
        root: __dirname
    })
})

app.get('/', (req, res) => {
    res.sendFile('public/index.html', {
        root: __dirname
    })
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
})