const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

app.get('/stocks', async (req, res) => {

  try {
    const stockSymbols = await stocks.getStocks()
    res.send({ availableStocks: stockSymbols })
  } catch (error) {
    console.error('Error getting available stocks: ', erorr.message);
    res.status(500).send({error: 'Failed to retrieve available stocks'})
  }

})

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req
  
  try {
    const data = await stocks.getStockPoints(symbol, new Date())
    res.send(data)
  } catch (error) {
    console.error(`Error getting stock data for ${symbol}:`, error.message);
    res.status(500).send({ error: `Failed to retrieve data for stock ${symbol}` });
  }
  
})





app.listen(3000, () => console.log('Server is running!'))
