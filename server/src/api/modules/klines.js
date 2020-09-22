import Candles from './candles'
import { config } from '../config'

import { saveKlines } from '../klines/queries'
import { ticks } from '../ticks/queries'

export default class Klines {
    constructor() {
        this.init()
    }

    init() {
        const dataPromises = config.markets.map(symbol => ticks(symbol))

        Promise.all(dataPromises).then(res => {
            if (res.length > 0) {
                res.forEach((data, idx) => {
                    const symbol = config.markets[idx]
                    config.intervals.forEach(interval => this.klines({ symbol, interval }, data))
                })
            }
        })
    }

    klines(params, ticks) {
        const data = new Candles(params, ticks)
        saveKlines({ ...params, data })
    }
}