// article-detail.ts
interface Article {
  id: string
  title: string
  content: string
  coverImage: string
  readTime: number
  readCount: number
  publishTime: string
  isFree: boolean
  author: string
  authorAvatar: string
  tags: string[]
  isLiked: boolean
  likeCount: number
  isCollected: boolean
  collectCount: number
}

Component({
  data: {
    article: {
      id: '',
      title: '',
      content: '',
      coverImage: '',
      author: '',
      authorAvatar: '',
      readTime: 0,
      readCount: 0,
      publishTime: '',
      isFree: true,
      tags: [],
      isLiked: false,
      likeCount: 0,
      isCollected: false,
      collectCount: 0
    } as Article,
    loading: true,
    showShareMenu: false
  },
  lifetimes: {
    attached() {
      // 延迟执行，避免初始化问题
      setTimeout(() => {
        this.loadArticleDetail()
      }, 100)
    }
  },
  methods: {
    // 加载文章详情
    loadArticleDetail() {
      try {
        // 简化参数获取，避免使用 getCurrentPages
        const articleId = '1'
      
      // 模拟数据
      const articleData: Article = {
        id: articleId,
        title: '新生儿喂养指南：母乳喂养的正确方法',
        content: `
          <p>母乳喂养是新生儿最好的营养来源，正确的喂养方法对宝宝的健康成长至关重要。本文将详细介绍母乳喂养的各个方面。</p>
          
          <h3>一、母乳喂养的好处</h3>
          <p>母乳含有丰富的营养物质，包括蛋白质、脂肪、碳水化合物、维生素和矿物质，能够满足宝宝0-6个月的营养需求。同时，母乳还含有免疫球蛋白，能够增强宝宝的免疫力。</p>
          
          <h3>二、正确的喂养姿势</h3>
          <p>1. 摇篮式：将宝宝横抱在怀中，头部枕在妈妈的手臂上，这是最常用的姿势。</p>
          <p>2. 侧卧式：妈妈侧卧，宝宝面向妈妈，适合夜间喂养。</p>
          <p>3. 橄榄球式：将宝宝夹在腋下，适合剖腹产妈妈。</p>
          
          <h3>三、喂养频率和时间</h3>
          <p>新生儿通常每2-3小时需要喂养一次，每次喂养时间约15-20分钟。随着宝宝成长，喂养间隔会逐渐延长。</p>
          
          <h3>四、常见问题及解决方法</h3>
          <p>1. 乳头疼痛：检查宝宝含乳姿势是否正确，确保宝宝张大嘴巴含住整个乳晕。</p>
          <p>2. 奶水不足：保持充足休息，多喝水，适当增加营养。</p>
          <p>3. 宝宝拒绝吃奶：检查是否有其他原因，如胀气、困倦等。</p>
          
          <h3>五、注意事项</h3>
          <p>1. 保持乳房清洁，但不要过度清洁。</p>
          <p>2. 注意观察宝宝的大小便情况，判断喂养是否充足。</p>
          <p>3. 如有疑问，及时咨询医生或专业哺乳顾问。</p>
        `,
        coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
        readTime: 5,
        readCount: 234,
        publishTime: '2024-01-15',
        isFree: true,
        author: '李医生',
        authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        tags: ['喂养', '母乳', '新生儿'],
        isLiked: false,
        likeCount: 45,
        isCollected: false,
        collectCount: 23
      }

      this.setData({
        article: articleData,
        loading: false
      })
      } catch (error) {
        console.error('加载文章详情失败:', error)
        this.setData({
          loading: false
        })
        wx.showToast({
          title: '加载失败',
          icon: 'error'
        })
      }
    },

    // 点赞/取消点赞
    onLike() {
      const isLiked = !this.data.article.isLiked
      const likeCount = this.data.article.likeCount + (isLiked ? 1 : -1)
      
      this.setData({
        'article.isLiked': isLiked,
        'article.likeCount': likeCount
      })

      wx.showToast({
        title: isLiked ? '点赞成功' : '取消点赞',
        icon: 'success'
      })
    },

    // 收藏/取消收藏
    onCollect() {
      const isCollected = !this.data.article.isCollected
      const collectCount = this.data.article.collectCount + (isCollected ? 1 : -1)
      
      this.setData({
        'article.isCollected': isCollected,
        'article.collectCount': collectCount
      })

      wx.showToast({
        title: isCollected ? '收藏成功' : '取消收藏',
        icon: 'success'
      })
    },

    // 分享文章
    onShare() {
      this.setData({
        showShareMenu: true
      })
      
      wx.showShareMenu({
        withShareTicket: true,
        success: () => {
          console.log('分享成功')
        }
      })
    },

    // 关注作者
    onFollowAuthor() {
      wx.showToast({
        title: '关注成功',
        icon: 'success'
      })
    },

    // 查看相关文章
    onViewRelatedArticles() {
      wx.navigateTo({
        url: '/pages/article-list/article-list'
      })
    }
  }
})
