<template>
    <div class="section">
        <div class="section-item section-item-filled">
            <div class="columns text-center">
                <div class="column col-6 col-sm-12">
                    <span class="text-semibold">{{sov}}</span> <span class="text-secondary">SOV</span>
                </div>
                <div class="column col-6 col-sm-12">
                    <span class="text-semibold">{{svx}}</span> <span class="text-secondary">SVX</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapState } from 'vuex'

    export default {
        data: () => ({
            sov: 0,
            svx: 0,

            polling: null
        }),
        computed: mapState({
            eos: state => state.blockchain.eos,
            scatter: state => state.blockchain.scatter,
        }),
        watch: {
            scatter(val) {
                if (val) this.getBalance()
            }
        },
        mounted() {
            this.polling = setInterval(() => this.getBalance(), 1000)
        },
        beforeDestroy() {
            if (this.polling) clearInterval(this.polling)
        },
        methods: {
            getBalance() {
                const sovBalancePrimise = this.eos.getTableRows({
                    "json": "true",
                    "code": "sovmintofeos",
                    "scope": this.scatter.name,
                    "table": "accounts"
                }).then(res => parseFloat(res.rows[0].balance))

                const svxBalancePrimise = this.eos.getTableRows({
                    "json": "true",
                    "code": "svxmintofeos",
                    "scope": this.scatter.name,
                    "table": "accounts"
                }).then(res => parseFloat(res.rows[0].balance))

                Promise.all([sovBalancePrimise, svxBalancePrimise]).then(res => {
                    this.sov = res[0] || 0
                    this.svx = res[1] || 0
                })
            },
        }
    }
</script>