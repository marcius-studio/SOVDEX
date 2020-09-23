import { CronJob } from 'cron'

import Klines from '../src/api/modules/klines'

new CronJob('0 */10m * * * *', () => {
   console.log('[cron] start 10m')
   new Klines()
}).start()


// Init methods
new Klines()