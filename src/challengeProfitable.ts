const prompt = require('prompt');

export const profitable = () => {

    console.log("\n\nEnter the prices");

    prompt.start();
    prompt.get(['prices'], (err, result) => {
        if(err) return onErr(err);

        console.log("*********************************************");

        let prices = findMoreProfitable(result.prices)
        console.log(prices);
        process.exit();
    })
}


const findMoreProfitable = (prices) => {
    const { profit } = prices.split(",").reduce((acc, price, index) => {
      const { buy, sell, profit } = acc;
      let currentPrices = {}
  
      if (!buy.price || +price < buy.price) {
        currentPrices = {
          buy: {
            price: +price,
            day: index + 1
          },
          sell: {}
        };
      } else if (!sell.price || +price > sell.price) {
        currentPrices = {
          buy,
          sell: {
            price: +price,
            day: index + 1
          }
        };
  
      }
  
      const bestProfit = currentPrices.sell?.price ? currentPrices.sell.price - currentPrices.buy.price : 0;
      
      return {
        ...acc,
        ...currentPrices,
        profit: bestProfit && bestProfit > profit ? bestProfit : profit
      };
    }, {
      buy: {},
      sell: {},
      profit: 0
    });
  
    return profit;
  };
  
  
const onErr = (err) => {
    console.log(err);
}


  console.log(findMoreProfitable("7,1,5,3,6,4"));
  
  console.log(findMoreProfitable("7,6,4,3,1"));