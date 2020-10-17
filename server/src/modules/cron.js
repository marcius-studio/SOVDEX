import { CronJob } from 'cron'
import { saveTicks, deleteTicks } from '../api/ticks/queries'

// Save price every minute
new CronJob('0 */1 * * * *', () => saveTicks()).start()

// Delete extra values ​​in the database every 5m
new CronJob('0 */5 * * * *', () => {
   console.log('[cron] delete extra ticks, every 5m')
   deleteTicks()
}).start()


// Init methods
deleteTicks()