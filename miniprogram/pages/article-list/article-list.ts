// article-list.ts
interface Article {
  id: string
  title: string
  summary: string
  coverImage: string
  readTime: number
  readCount: number
  publishTime: string
  isFree: boolean
  author: string
  authorAvatar: string
  tags: string[]
  content: string
  isLiked: boolean
  likeCount: number
  isCollected: boolean
  collectCount: number
}

Component({
  data: {
    articles: [] as Article[],
    loading: true,
    hasMore: true,
    page: 1,
    pageSize: 10,
    columnId: '',
    columnTitle: '',
    sortType: 'latest', // latest, popular, free
    sortOptions: [
      { value: 'latest', label: '最新' },
      { value: 'popular', label: '最热' },
      { value: 'free', label: '免费' }
    ]
  },
  lifetimes: {
    attached() {
      // 延迟执行，避免初始化问题
      setTimeout(() => {
        this.loadPageData()
      }, 100)
    }
  },
  methods: {
    // 加载页面数据
    loadPageData() {
      try {
        // 简化参数获取，避免使用 getCurrentPages
        const columnId = ''
      
      this.setData({
        columnId: columnId,
        columnTitle: columnId ? '专栏文章' : '全部文章'
      })
      
      this.loadArticles()
      } catch (error) {
        console.error('加载页面数据失败:', error)
      }
    },

    // 加载文章列表
    loadArticles() {
      if (this.data.loading) return
      
      this.setData({ loading: true })
      
      // 模拟数据
      const mockArticles: Article[] = [
        {
          id: '1',
          title: '新生儿喂养指南：母乳喂养的正确方法',
          summary: '详细介绍母乳喂养的姿势、频率、时间等关键要点，帮助新手妈妈建立正确的喂养习惯...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 5,
          readCount: 234,
          publishTime: '2024-01-15',
          isFree: true,
          author: '李医生',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          tags: ['喂养', '母乳', '新生儿'],
          content: '文章内容...',
          isLiked: false,
          likeCount: 45,
          isCollected: false,
          collectCount: 23
        },
        {
          id: '2',
          title: '宝宝睡眠规律建立：0-3个月睡眠训练',
          summary: '科学的方法帮助宝宝建立良好的睡眠习惯，解决夜醒、入睡困难等问题...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 8,
          readCount: 189,
          publishTime: '2024-01-12',
          isFree: false,
          author: '李医生',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          tags: ['睡眠', '训练', '0-3个月'],
          content: '文章内容...',
          isLiked: false,
          likeCount: 32,
          isCollected: false,
          collectCount: 18
        },
        {
          id: '3',
          title: '新生儿常见疾病预防与护理',
          summary: '了解新生儿常见疾病的症状、预防措施和家庭护理方法...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 6,
          readCount: 156,
          publishTime: '2024-01-10',
          isFree: true,
          author: '李医生',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          tags: ['疾病', '预防', '护理'],
          content: '文章内容...',
          isLiked: false,
          likeCount: 28,
          isCollected: false,
          collectCount: 15
        },
        {
          id: '4',
          title: '宝宝疫苗接种时间表及注意事项',
          summary: '详细的疫苗接种计划，帮助家长合理安排宝宝的疫苗接种时间...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 7,
          readCount: 298,
          publishTime: '2024-01-08',
          isFree: true,
          author: '王医生',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          tags: ['疫苗', '接种', '时间表'],
          content: '文章内容...',
          isLiked: false,
          likeCount: 67,
          isCollected: false,
          collectCount: 34
        },
        {
          id: '5',
          title: '0-1岁宝宝辅食添加指南',
          summary: '科学的辅食添加顺序、时间、方法，让宝宝健康成长...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 9,
          readCount: 167,
          publishTime: '2024-01-05',
          isFree: false,
          author: '营养师小王',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          tags: ['辅食', '营养', '0-1岁'],
          content: '文章内容...',
          isLiked: false,
          likeCount: 41,
          isCollected: false,
          collectCount: 22
        }
      ]

      // 模拟分页加载
      setTimeout(() => {
        const newArticles = mockArticles.slice(0, this.data.page * this.data.pageSize)
        this.setData({
          articles: newArticles,
          loading: false,
          hasMore: newArticles.length < mockArticles.length
        })
      }, 500)
    },

    // 查看文章详情
    onArticleTap(e: any) {
      const articleId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/article-detail/article-detail?id=${articleId}`
      })
    },

    // 切换排序方式
    onSortChange(e: any) {
      const sortType = e.currentTarget.dataset.type
      if (sortType === this.data.sortType) return
      
      this.setData({
        sortType: sortType,
        page: 1,
        articles: []
      })
      
      this.loadArticles()
    },

    // 加载更多
    onLoadMore() {
      if (!this.data.hasMore || this.data.loading) return
      
      this.setData({
        page: this.data.page + 1
      })
      
      this.loadArticles()
    },

    // 下拉刷新
    onRefresh() {
      this.setData({
        page: 1,
        articles: [],
        hasMore: true
      })
      
      this.loadArticles()
    }
  }
})
