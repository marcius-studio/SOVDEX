import axios from 'axios'
import { schema, config } from '../config'

import { tickModel, tickModelProduction } from './models'

/**
* Queries
* data retrieval operations
*/

export const ticks = (symbol) => {
    return tickModel.find({ symbol }).sort('time').limit(80000).exec()
}

/**
* Mutations
* data change operations (save, delete, update)
*/

const request = (data) => {
    return axios({ method: 'post', url: 'http://api.cypherglass.com/v1/chain/get_table_rows', data })
}

export const saveTick = async (symbol) => {
    const price = await request(schema[symbol])
        .then(({ data }) => data.rows[0] ? parseFloat(parseFloat(data.rows[0].price).toFixed(8)) : false)

    if (price) {
        return new tickModel({ symbol, price, time: Date.now() }).save()
    }
}

export const saveTicks = () => {
    return config.markets.forEach(symbol => saveTick(symbol))
}

export const deleteTicks = () => {
    const timeLine = Date.now() - (1000 * 60 * 60 * 24 * 15)  // 15d
    return tickModel.deleteMany({ time: { $lt: timeLine } })
        .then(res => res)
        .catch(err => console.log(err))
}