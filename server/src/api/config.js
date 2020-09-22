export const schema = {
    soveos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "pair",
        "json": true
    },
    svxeos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "svxpair",
        "json": true
    },
    sovusdt: {
        "code": "sovdexrelays",
        "scope": "USDT",
        "table": "pair",
        "json": true
    },
    eospbtc: {
        "code": "sovdexrelays",
        "scope": "PBTC",
        "table": "eospair",
        "json": true
    },
    powpbtc: {
        "code": "sovdexrelays",
        "scope": "PBTC",
        "table": "powpair",
        "json": true
    }
}

export const config = {
    markets: Object.keys(schema), // [ 'soveos', 'svxeos', 'sovusdt', 'eospbtc', 'powpbtc' ]
    intervals: ['15m', '1h', '4h', '1d']
}