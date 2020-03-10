const express = require('express');
const DataStore = require('nedb');
const app = express();

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening at ${PORT}`))
app.use(express.static('public'))
app.use(express.json({ limit: '200mb' }))

const db = new DataStore({ filename: './DATA/test.db', autoload: true });


app.get('/api', (request, response) => {
    db.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    var data = request.body;
    var timeStamp = new Date();
    data.timeStamp = timeStamp;
    db.insert(data);
    response.json(data);
});