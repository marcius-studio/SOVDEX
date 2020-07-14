export default {
    data: () => ({
        price: {
            eos: 0,
            usdt: 0,
            pbtc: 0
        },
        bancor: {}
    }),
    computed: {
        bancorPrice() {
            const symbol = this.$route.params.symbol

            if (this.bancor[this.pair.quote]) {
                const bancor = this.getBancor(this.bancor[this.pair.quote], this.buyAmount, this.sellAmount)
                return bancor
            }

            return { buy: 0, sell: 0 }
        },
    },
    methods: {
        getRate() {
            const eosPromise = this.eos.getTableRows({ "code": "sovdexrelays", "scope": "EOS", "table": "pair", "json": true })
                .then((res) => this.updateResponse(res))

            const usdtPromise = this.eos.getTableRows({ "code": "sovdexrelays", "scope": "USDT", "table": "pair", "json": true })
                .then((res) => this.updateResponse(res))

            const pbtcPrimise = this.eos.getTableRows({ "code": "sovdexrelays", "scope": "PBTC", "table": "eospair", "json": true })
                .then((res) => this.updateResponse(res))

            Promise.all([eosPromise, usdtPromise, pbtcPrimise]).then(res => {
                this.price = { eos: res[0].price, usdt: res[1].price, pbtc: res[2].price }
                this.bancor = {
                    eos: res[0].bancor,
                    usdt: res[1].bancor,
                    pbtc: res[2].bancor,
                }
            })
        },
        updateResponse(res) {
            const bancor = res
            const price = parseFloat(res.rows[0].price)
            return { bancor, price }
        },
        getBancor({ rows }, buyAmount, sellAmount) {

            const cw = parseFloat(rows[0].cw)
            const balance = parseFloat(rows[0].connectorbal)
            const outstanding = parseFloat(rows[0].outstandingbal)

            buyAmount = parseFloat(buyAmount)
            sellAmount = parseFloat(sellAmount)

            const buy = (-outstanding * (Math.pow((1 - (buyAmount / (balance + buyAmount))), (cw / 100)) - 1)).toFixed(8)
            const sell = (-balance * (Math.pow(((1 - (sellAmount / (outstanding + sellAmount)))), (1 / (cw / 100))) - 1)).toFixed(8)

            return { buy: parseFloat(buy), sell: parseFloat(sell) }
        },
        cutBancor(quantity, currency) {
            if (currency == 'pow' || currency == 'pbtc') return quantity

            return quantity.toFixed(4)
        }
    }
}