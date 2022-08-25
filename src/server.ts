import { mostFrequentWord } from "./challengeCount";
import { profitable } from "./challengeProfitable";
const prompt = require('prompt');



const hitOperation = () => {

    console.log("*********************************\n\n");
    console.log("1 Challege Frequent Word");
    console.log("2 Challeger Profitable Operation");
    console.log("3 Exit\n");
    prompt.start();
    prompt.get(['hit'], (err, result) => {

        console.log("\n\n*********************************************");
        console.log(result.hit);
        if(result.hit === "1") mostFrequentWord();
        if(result.hit === "2") profitable();
        if(result.hit === "3") process.exit();
        })
}

hitOperation();1