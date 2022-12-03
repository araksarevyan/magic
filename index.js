const express = require('express');
const fs = require('fs');
var cors = require('cors')

const app = express();
const port = process.env.PORT || 3001;

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

var magicData = {};
app.get("/", cors(corsOpts), (req, res) => res.type('html').send(html));

fs.readFile('data.json', 'utf8', function(err, data){
    magicData = JSON.parse(data); 
});

app.get('/getthemagic', cors(corsOpts), (req, res) => {
    console.log("/getthemagic");

    res.json(magicData);
})
app.get('/getthemagic/:id', cors(corsOpts), (req, res) => {
    console.log("/getthemagic/" + req.params.id);

    if (magicData[req.params.id]) {
        res.json(magicData[req.params.id]);
    }
    else {
        res.json({"error": "No data found."});
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const html = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background: white;
        background-image: url("https://wallpaperaccess.com/full/870956.jpg");
        background-attachment: fixed;
        background-position: center;
      }
    </style>
  </head>
  <body>
  </body>
</html>
`