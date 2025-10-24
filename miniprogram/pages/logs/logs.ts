// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

Component({
  data: {
    logs: [],
  },
  lifetimes: {
    attached() {
      // 延迟执行，避免初始化问题
      setTimeout(() => {
        this.setData({
          logs: (wx.getStorageSync('logs') || []).map((log: string) => {
            return {
              date: formatTime(new Date(log)),
              timeStamp: log
            }
          }),
        })
      }, 100)
    }
  },
})
