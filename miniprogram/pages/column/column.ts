// column.ts
interface Column {
  id: string
  title: string
  description: string
  coverImage: string
  author: string
  authorAvatar: string
  articleCount: number
  readCount: number
  category: string
  tags: string[]
  subscribeCount: number
  isSubscribed: boolean
  isHot: boolean
}

Component({
  data: {
    columns: [] as Column[],
    loading: true,
    hasMore: true,
    page: 1,
    pageSize: 10,
    sortType: 'latest', // latest, popular, subscribe
    sortOptions: [
      { value: 'latest', label: '最新' },
      { value: 'popular', label: '最热' },
      { value: 'subscribe', label: '订阅最多' }
    ]
  },
  lifetimes: {
    attached() {
      // 延迟执行，避免初始化问题
      setTimeout(() => {
        this.loadColumns()
      }, 100)
    }
  },
  methods: {
    // 加载专栏列表
    loadColumns() {
      if (this.data.loading) return
      
      this.setData({ loading: true })
      
      // 模拟数据
      const mockColumns: Column[] = [
        {
          id: '1',
          title: '0-1岁宝宝护理指南',
          description: '专业的新生儿护理知识，帮助新手父母更好地照顾宝宝',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '李医生',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          articleCount: 25,
          readCount: 1234,
          category: '新生儿护理',
          tags: ['新生儿', '护理', '0-1岁'],
          subscribeCount: 856,
          isSubscribed: false,
          isHot: true
        },
        {
          id: '2',
          title: '儿童营养与健康',
          description: '科学的营养搭配，让孩子健康成长',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '营养师小王',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          articleCount: 18,
          readCount: 856,
          category: '营养健康',
          tags: ['营养', '健康', '饮食'],
          subscribeCount: 432,
          isSubscribed: false,
          isHot: true
        },
        {
          id: '3',
          title: '早教启蒙教育',
          description: '科学的早教方法，开发孩子潜能',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '早教专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          articleCount: 32,
          readCount: 2156,
          category: '早教启蒙',
          tags: ['早教', '启蒙', '教育'],
          subscribeCount: 1234,
          isSubscribed: false,
          isHot: false
        },
        {
          id: '4',
          title: '儿童心理发展',
          description: '了解孩子心理发展规律，建立良好亲子关系',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '心理专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          articleCount: 20,
          readCount: 987,
          category: '心理健康',
          tags: ['心理', '发展', '亲子'],
          subscribeCount: 567,
          isSubscribed: false,
          isHot: false
        },
        {
          id: '5',
          title: '儿童安全教育',
          description: '全面的安全防护知识，保护孩子健康成长',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '安全专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          articleCount: 15,
          readCount: 654,
          category: '安全教育',
          tags: ['安全', '防护', '教育'],
          subscribeCount: 234,
          isSubscribed: false,
          isHot: false
        }
      ]

      // 模拟分页加载
      setTimeout(() => {
        const newColumns = mockColumns.slice(0, this.data.page * this.data.pageSize)
        this.setData({
          columns: newColumns,
          loading: false,
          hasMore: newColumns.length < mockColumns.length
        })
      }, 500)
    },

    // 跳转到专栏详情
    onColumnTap(e: any) {
      const columnId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/column-detail/column-detail?id=${columnId}`
      })
    },

    // 切换排序方式
    onSortChange(e: any) {
      const sortType = e.currentTarget.dataset.type
      if (sortType === this.data.sortType) return
      
      this.setData({
        sortType: sortType,
        page: 1,
        columns: []
      })
      
      this.loadColumns()
    },

    // 订阅/取消订阅
    onSubscribe(e: any) {
      e.stopPropagation()
      const columnId = e.currentTarget.dataset.id
      const columnIndex = this.data.columns.findIndex(col => col.id === columnId)
      
      if (columnIndex !== -1) {
        const isSubscribed = !this.data.columns[columnIndex].isSubscribed
        const subscribeCount = this.data.columns[columnIndex].subscribeCount + (isSubscribed ? 1 : -1)
        
        this.setData({
          [`columns[${columnIndex}].isSubscribed`]: isSubscribed,
          [`columns[${columnIndex}].subscribeCount`]: subscribeCount
        })

        wx.showToast({
          title: isSubscribed ? '订阅成功' : '取消订阅',
          icon: 'success'
        })
      }
    },

    // 加载更多
    onLoadMore() {
      if (!this.data.hasMore || this.data.loading) return
      
      this.setData({
        page: this.data.page + 1
      })
      
      this.loadColumns()
    },

    // 下拉刷新
    onRefresh() {
      this.setData({
        page: 1,
        columns: [],
        hasMore: true
      })
      
      this.loadColumns()
    }
  }
})
