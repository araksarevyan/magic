const fs = require('fs');
const { unescape } = require('querystring');


fs.readFile('toread.txt', 'utf8', function(err, data){
    var newData = parseData(data); 
    fs.writeFile("final.json", newData, (err) => {});
});


function parseData(data) {
    function unEscape(htmlStr) {
        htmlStr = htmlStr.replace(/\n/g , "");
        htmlStr = htmlStr.replace(/<strong>/g , "");
        htmlStr = htmlStr.replace(/<\/strong>/g , "");
        regexMain = /nl.boon.client.application.StandaloneConstants.dataModel = (.+)styleScriptManifest/g;
        const dataModel = htmlStr.match(regexMain);

        // console.log(dataModel)
        // return dataModel;
        
        htmlStr = dataModel[0].replace(/<p>Unfortunately, that is not correct.<\/p>/g , "<p>Unfortunately, that is not correct.<\/p>\n\n\n");

        
        const regex = /<p>.+<\/p>.+<p>Unfortunately, that is not correct.<\/p>/g;
        const regex1 = /<p>.*?<\/p>/gi;
        const regex2 = /<\/p>.*?<p>/gi;
        const regex3 = /<\/p>R\d+(t|f)/;
        const allMatches = htmlStr.match(regex);
        const allQuestions = [];

        for (var j = 0; j < allMatches.length; j++) {
            found = allMatches[j];
            var tmp = {
                "question" : "",
                "answers" : [
                    {
                        "text" : "",
                        "isCorrect" : ""
                    },
                    {
                        "text" : "",
                        "isCorrect" : ""
                    },
                    {
                        "text" : "",
                        "isCorrect" : ""
                    },
                ]
            };
    
            const found1 = found.match(regex1);
            // console.log(found1);
    
            const found2 = found.match(regex2);
            // console.log(found2);

            var ind = 3;
            while (!(found2[found2.length - ind]).match(regex3)) {
                ind++;
                // console.log(ind);
            }
            tmp.answers[2].isCorrect = (found2[found2.length - ind]).match(regex3)[1]
            tmp.answers[1].isCorrect = (found2[found2.length - (ind + 1)]).match(regex3)[1]
    

            if (ind - 3 >= 3) {
                tmp.question += found1[found1.length - (ind - 1)]
            }
            if (ind - 2 >= 3) {
                tmp.question += found1[found1.length - (ind - 1)]
            }
            if (ind - 1 >= 3) {
                tmp.question += found1[found1.length - (ind - 1)]
            }
            tmp.question += found1[found1.length - ind]
            tmp.answers[2].text = found1[found1.length - (ind + 1)]
            tmp.answers[1].text = found1[found1.length - (ind + 2)]
            tmp.answers[0].text = found1[found1.length - (ind + 3)]


            tmp.question = tmp.question.replace(/<p>/g , "");
            tmp.question = tmp.question.replace(/<\/p>/g , " ");
            tmp.answers[2].text = tmp.answers[2].text.replace(/<p>/g , "");
            tmp.answers[2].text = tmp.answers[2].text.replace(/<\/p>/g , " ");
            tmp.answers[1].text = tmp.answers[1].text.replace(/<p>/g , "");
            tmp.answers[1].text = tmp.answers[1].text.replace(/<\/p>/g , " ");
            tmp.answers[0].text = tmp.answers[0].text.replace(/<p>/g , "");
            tmp.answers[0].text = tmp.answers[0].text.replace(/<\/p>/g , " ");
    
    
            var correctFount = false;
            for (var i = 0; i < tmp.answers.length; i++) {
                if (tmp.answers[i].isCorrect == "t") {
                    tmp.answers[i].isCorrect = true;
                    correctFount = true;
                }
                if (tmp.answers[i].isCorrect == "f") {
                    tmp.answers[i].isCorrect = false;
                }
            }
            if (correctFount) {
                tmp.answers[0].isCorrect = false;
            }
            else {
                tmp.answers[0].isCorrect = true;
            }
            allQuestions.push(tmp);
        }

        // htmlStr = htmlStr.replace(/<\/p>y17/g , "<\/p>y17\n\n\n\n");	 
        // htmlStr = htmlStr.replace(/<\/p>/g , "<\/p>\n");	 
        // htmlStr = htmlStr.replace(/<p>/g , "\n<p>");

        final = JSON.stringify(allQuestions);
        final = final.replace(/\\u0019/g , "'");
        final = final.replace(/\\u001c/g , "“");
        final = final.replace(/\\u001d/g , "”");
        final = final.replace(/&quot;/g , "'");
        final = final.replace(/&nbsp;/g , "");

        if (final.search(/\\u0/g) != -1) {
            console.log("bad chars");
        }

        return final;
    }

    data = unescape(data);
    data = unescape(data);
    data = unescape(data);
    data = unescape(data);
    newData = unEscape(data);
    return newData;
}