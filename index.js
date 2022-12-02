const express = require('express');
const fs = require('fs');

const app = express();
const port = 5000;

var magicData = {};

fs.readFile('data.json', 'utf8', function(err, data){
    magicData = JSON.parse(data); 
});

app.get('/getthemagic', (req, res) => {
    res.json(magicData);
})
app.get('/getthemagic/:id', (req, res) => {
    if (magicData[req.params.id]) {
        res.json(magicData[req.params.id]);
    }
    else {
        res.json({"error": "No data found."});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
