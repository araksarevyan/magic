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