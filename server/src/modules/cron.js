import { fork } from 'child_process'
import { CronJob } from 'cron'

import { saveTicks, deleteTicks } from '../api/ticks/queries'

// Save price every minute
new CronJob('0 */1 * * * *',  () => {
   saveTicks()
}).start()

// Delete extra values ​​in the database every 10m
new CronJob('0 */10 * * * *', () => {
   console.log('[cron] delete extra ticks, every 1h')
   fork(__dirname + '/child.js')
   deleteTicks()
}).start()


/**
 * Init methods
 * run child process 
 */

fork(__dirname + '/child.js')