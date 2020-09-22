import { klinesModel } from './models'

export const klines = ({ symbol, interval, limit = 300 }) => {
    return klinesModel.findOne({ symbol }).where({ interval }).sort('time').limit(limit)
        .then(res => (res) ? res.data : [])
}

export const saveKlines = ({ symbol, interval, data = [] }) => {
    klinesModel.findOne({ symbol, interval }, (err, res) => {
        if (!res) return new klinesModel({ symbol, interval, data }).save()
        res.data = data
        return res.save()
    })
}