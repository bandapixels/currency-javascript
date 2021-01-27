const createElement = require('./utils/createElement');
const bubbleSort = require('./utils/bubbleSort');

const lineOptions = {
  startColor: "orange",
  endColor: "blue",
  maxColor: "red",
  minColor: "green",
  width: 100
}; // spark line options
const table = document.getElementById('currencies-table'); // main table
let currenciesPairsInfo = [];

// update array with info about currency pairs
const updateData = (data) => {
  const body = JSON.parse(data.body);
  const midPrice = (body.bestBid + body.bestAsk) / 2;
  const currencyIndex = currenciesPairsInfo.findIndex(currency => currency.name === body.name); // check if we already have this currency pair
  if (currencyIndex > -1) {
    // update info if already have it
    currenciesPairsInfo[currencyIndex] = Object.assign(body, {
      arrTimer: [...currenciesPairsInfo[currencyIndex].arrTimer, midPrice],
      arrPoints: [...currenciesPairsInfo[currencyIndex].arrPoints]
    });
  } else {
    // add new one
    currenciesPairsInfo.push(Object.assign(body, {
      arrTimer: [midPrice], // array of mid prices
      arrPoints: [] // array of points for graph
    }));
  }
}


// this function render table with the currency pairs
const renderTable = () => {
  const sortedArr = bubbleSort(currenciesPairsInfo, 'lastChangeBid'); // sort our currency data by lastChangeBid value
  table.innerHTML = ''; // make our table empty

  // create rows for each currency and add it to the table
  sortedArr.forEach(currency => {
    const tdName = createElement('td', currency.name);
    const tdBestBid = createElement('td', currency.bestBid);
    const tdBestAsk = createElement('td', currency.bestAsk);
    const tdLastChangeBid = createElement('td', currency.lastChangeBid);
    const tdLastChangeAsk = createElement('td', currency.lastChangeAsk);
    const line = createElement('span');
    Sparkline.draw(line, currency.arrPoints, lineOptions);
    const tdLine = createElement('td', [line]);
    const tr = createElement(
      'tr',
      [tdName, tdBestBid, tdBestAsk, tdLastChangeBid, tdLastChangeAsk, tdLine]
    );

    table.append(tr);
  });
};

// redraw graphs every n seconds
const renderGraph = (seconds) => {
  setInterval(() => {
    currenciesPairsInfo = currenciesPairsInfo.map(currency => {
      let averagePrice = 0; // if there was no updates last 30 seconds average price will be 0

      if (currency.arrTimer.length > 0) {
        averagePrice = currency.arrTimer.reduce((sum, curr) => sum + curr) / currency.arrTimer.length; // calculate average price for the last n seconds
      }

      currency.arrPoints.push(averagePrice); // add new point for graph
      currency.arrTimer = []; // clean array with mid price

      return currency;
    });
  }, seconds);
}

module.exports = {
  updateData,
  renderTable,
  renderGraph
}
