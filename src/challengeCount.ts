const prompt = require('prompt');

export const mostFrequentWord= ()  => {

    console.log("\n\nEnter the text: ");

    prompt.start();
    prompt.get(['paragraph'], (err, result) => {
        if(err) return onErr(err);

        console.log("*********************************************");
        //console.log(`input: ${result.paragraph}`);
        let process = textProcessor(result.paragraph);
        let processJson = formatJson(process);
        let processoFinal =  countJson(result.paragraph, processJson);
        
        console.log(processoFinal);
        //process.exit();
    })

}


const textProcessor = text  => {
    
    const wordRegex = new RegExp("\\W+","g");
    const wordsList = text.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(wordRegex);
    let wordFound = "";

    const wordsCounter = wordsList.reduce((counters, word) => {
    const currentCounter = (counters[word] || 0) + 1;
    const previousCounter = (counters[wordFound] || 0);
    wordFound = currentCounter > previousCounter ? word : wordFound;


    return {
    ...counters,
    [word]: currentCounter
    };

    }, {});

    return  [wordsCounter];
}

const formatJson = object => {
    let result = [];
    for(let key in object[0]) {
        result.push({"word": key, "count": object[0][key]})
    }
    return result;
}

const countJson = (origem, json) => {


    let validate = validateOneCount(json);

    let forbiddenWords = [];
    let output = [];

    for(let position in json) {

        if(validate){
            output.push(json[position].word)
        }

        if(json[position].count === 2){
            output.push(json[position].word)
        };

        if(json[position].count >= 3){
            forbiddenWords.push(json[position].word)
        };
    }
    return {paragraph: origem, "ForbiddenWords": forbiddenWords, "Output": output}


}

const validateOneCount = json => {
    
    let countList = [];

    for(let item in json) {
        countList.push(json[item].count)     
        }

    let validateMax = countList.map(Number).reduce((a,b) => Math.max(a,b));
    let validateMin = countList.map(Number).reduce((a,b) => Math.min(a,b));


    return validateMax >= 3 && validateMin === 1 ? true : false;
    
}

const onErr = (err) => {
    console.log(err);
}

