const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.use(express.static("public"))

app.get('/store', (req, res) => {
    res.sendFile('public/store.json', {
        root: __dirname
    })
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    })
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
})