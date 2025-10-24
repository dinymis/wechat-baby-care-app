// column-detail.ts
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
}

interface Article {
  id: string
  title: string
  summary: string
  coverImage: string
  readTime: number
  readCount: number
  publishTime: string
  isFree: boolean
}

Component({
  data: {
    column: {} as Column,
    articles: [] as Article[],
    loading: true
  },
  lifetimes: {
    attached() {
      // 延迟执行，避免初始化问题
      setTimeout(() => {
        this.loadColumnDetail()
      }, 100)
    }
  },
  methods: {
    // 加载专栏详情
    loadColumnDetail() {
      try {
        // 简化参数获取，避免使用 getCurrentPages
        const columnId = '1'
      
      // 模拟数据
      const columnData: Column = {
        id: columnId,
        title: '0-1岁宝宝护理指南',
        description: '专业的新生儿护理知识，帮助新手父母更好地照顾宝宝。本专栏由资深儿科医生李医生精心编写，涵盖新生儿护理的各个方面，包括喂养、睡眠、健康监测等实用内容。',
        coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
        author: '李医生',
        authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        articleCount: 25,
        readCount: 1234,
        category: '新生儿护理',
        tags: ['新生儿', '护理', '0-1岁', '喂养'],
        subscribeCount: 856,
        isSubscribed: false
      }

      const articlesData: Article[] = [
        {
          id: '1',
          title: '新生儿喂养指南：母乳喂养的正确方法',
          summary: '详细介绍母乳喂养的姿势、频率、时间等关键要点，帮助新手妈妈建立正确的喂养习惯...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 5,
          readCount: 234,
          publishTime: '2024-01-15',
          isFree: true
        },
        {
          id: '2',
          title: '宝宝睡眠规律建立：0-3个月睡眠训练',
          summary: '科学的方法帮助宝宝建立良好的睡眠习惯，解决夜醒、入睡困难等问题...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 8,
          readCount: 189,
          publishTime: '2024-01-12',
          isFree: false
        },
        {
          id: '3',
          title: '新生儿常见疾病预防与护理',
          summary: '了解新生儿常见疾病的症状、预防措施和家庭护理方法...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 6,
          readCount: 156,
          publishTime: '2024-01-10',
          isFree: true
        }
      ]

      this.setData({
        column: columnData,
        articles: articlesData,
        loading: false
      })
      } catch (error) {
        console.error('加载专栏详情失败:', error)
        this.setData({
          loading: false
        })
        wx.showToast({
          title: '加载失败',
          icon: 'error'
        })
      }
    },

    // 订阅/取消订阅
    onSubscribe() {
      const isSubscribed = !this.data.column.isSubscribed
      const subscribeCount = this.data.column.subscribeCount + (isSubscribed ? 1 : -1)
      
      this.setData({
        'column.isSubscribed': isSubscribed,
        'column.subscribeCount': subscribeCount
      })

      wx.showToast({
        title: isSubscribed ? '订阅成功' : '取消订阅',
        icon: 'success'
      })
    },

    // 查看文章详情
    onArticleTap(e: any) {
      const articleId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/article-detail/article-detail?id=${articleId}`
      })
    },

    // 查看所有文章
    onViewAllArticles() {
      wx.navigateTo({
        url: `/pages/article-list/article-list?columnId=${this.data.column.id}`
      })
    },

    // 分享专栏
    onShare() {
      wx.showShareMenu({
        withShareTicket: true
      })
    }
  }
})
