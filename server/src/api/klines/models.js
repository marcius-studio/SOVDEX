import mongoose from 'mongoose'

const klines = {
    symbol: {
        type: String,
        required: true,
    },
    interval: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true,
        default: []
    }
}

const schema = new mongoose.Schema(klines)
export const klinesModel = mongoose.model('klines', schema)