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
// app.use((request, response, next) => {
//   cors(corsOpts);
//   response.set('Referrer-Policy', 'no-referrer');
//   next();
// })

var magicData = {};
app.get("/", cors(corsOpts), (req, res) => res.type('html').send(html));

fs.readFile('data.json', 'utf8', function(err, data){
  magicData = JSON.parse(data); 
});

app.get('/getthemagic', cors(corsOpts), (req, res) => {
  res.set('Referrer-Policy', 'no-referrer');
  console.log("/getthemagic");
  res.json(magicData);
});

app.get('/getthemagicscript', cors(corsOpts), (req, res) => {
  res.set('Referrer-Policy', 'no-referrer');
  console.log("/getthemagicscript");
  res.type('html').send(magicScript);
});

app.get('/getthemagic/:id', cors(corsOpts), (req, res) => {
  res.set('Referrer-Policy', 'no-referrer');
  console.log("/getthemagic/" + req.params.id);
  if (magicData[req.params.id]) {
    res.json(magicData[req.params.id]);
  }
  else {
    res.json({"error": "No data found, wrong URL."});
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const magicScript = `
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
      <section>
        <h4>Run this script in browser console when the page of the test is open.</h4>
      </section>
      <section>
      <pre>
var tag = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
fetch('https://magic-iq8u.onrender.com/getthemagic/' + tag)
  .then((response) => response.json())
  .then((data) => {
    var questionStyle = 'color: black;';
    var wrongAnswerStyle = 'color: red; margin-left:20px;';
    var correctAnswerStyle = 'color:green; font-weight: bold; margin-left:20px;';
    for (var i of data) {
      console.log("%c " + i.question, questionStyle);
      for (var j of i.answers) {
        if (j.isCorrect) console.log( "%c " + j.text, correctAnswerStyle);
        else console.log( "%c " + j.text, wrongAnswerStyle);
      }
    }
  });
        </pre>
      </section>
  </body>
</html>`;

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
`;