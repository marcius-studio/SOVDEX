# Server 

Generates OHLC data from blockchain tick.

* Pairs: **soveos, svxeos, sovusdt, eospbtc, powpbtc**
* Intervals: **15m, 1h, 4h, 1d** etc. Based on repo [timestring](https://www.npmjs.com/package/timestring)
* Max **300** candles

### Algoritm

1. Сonnect to NoSQL (MongoDB Atlas) database
2. Save tick every minutes as `{symbol:'soveos', price:0.0004, time:1593880500000}`
3. Build OHLC candles using minute ticks in [candle.js](src/api/modules/candles.js)
   1. Build sessions `[{ openTime:Timestamp, closeTime:Timestamp}]`
   2. Fill session with range of ticks `[{symbol:String, price:Number, time:Timestamp}, ... ]`
   3. Create candle from range data `{open:Number, high:Number, low:Number, close:Number}` for every session
4. Save klines in database for speed up charts
5. With long-term accumulation, auto-removes excess data from database every `hour`

## How to use

Set access to MongoDB Atlas in [config.js](src/config.js).

```javascript
db: {
		user: '<username>',
		password: '<password>',
		cluster: '<cluster>'
    },
```

* Request to `http://localhost:3000/?symbol=soveos&interval=15m&limit=100`
* Response `[{openTime:Timestamp, closeTime:Timestamp, open:Number, high:Number, low:Number, close:Number}, ... ]`

### Update markets

List of markets is formed on the basis of [config](src/api/config.js).

If need add market, just update config with `<key>:<value>`:

* `key` => `svxeos` name of market
* `value` => `{  "code": "sovdexrelays", ... }` params for getting `price` from blockchain

```js
 svxeos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "svxpair",
        "json": true
},
```

### Config example

```js
const schema = {
   svxeos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "svxpair",
        "json": true
   },
   ...
}

export const config = {
    markets: Object.keys(schema), // [ 'soveos', 'svxeos', 'sovusdt', 'eospbtc', 'powpbtc' ]
    intervals: ['15m', '1h', '4h', '1d']
}
```

Single config will automatically keep up-to-date information on the server and client