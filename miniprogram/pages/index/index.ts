// index.ts

interface Column {
  id: string
  title: string
  description: string
  coverImage: string
  author: string
  articleCount: number
  readCount: number
  category: string
  tags: string[]
}

interface Article {
  id: string
  title: string
  summary: string
  coverImage: string
  author: string
  authorAvatar: string
  readTime: number
  readCount: number
  publishTime: string
  isFree: boolean
  tags: string[]
  category: string
}

Page({
  data: {
    // 轮播图数据
    banners: [
      {
        id: '1',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '新生儿护理指南',
        link: '/pages/article-detail/article-detail?id=1'
      },
      {
        id: '2',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '营养健康知识',
        link: '/pages/article-detail/article-detail?id=2'
      }
    ],
    // 推荐专栏数据
    columns: [
      {
        id: '1',
        title: '0-1岁宝宝护理指南',
        description: '专业的0-1岁宝宝护理知识，帮助新手父母更好地照顾宝宝',
        coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
        author: '李医生',
        articleCount: 25,
        readCount: 1234,
        category: '新生儿护理',
        tags: ['新生儿', '护理', '0-1岁']
      },
      {
        id: '2',
        title: '营养健康专栏',
        description: '科学的营养搭配和健康饮食指导',
        coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
        author: '营养师小王',
        articleCount: 18,
        readCount: 856,
        category: '营养健康',
        tags: ['营养', '健康', '饮食']
      },
      {
        id: '3',
        title: '早教启蒙课堂',
        description: '科学的早教方法和启蒙教育指导',
        coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
        author: '早教专家',
        articleCount: 32,
        readCount: 2156,
        category: '早教启蒙',
        tags: ['早教', '启蒙', '教育']
      }
    ] as Column[],
    // 分类数据
    categories: [
      { id: '1', name: '新生儿护理', count: 15, icon: '👶' },
      { id: '2', name: '营养健康', count: 23, icon: '🥗' },
      { id: '3', name: '早教启蒙', count: 18, icon: '🧠' },
      { id: '4', name: '心理健康', count: 12, icon: '💝' },
      { id: '5', name: '安全教育', count: 8, icon: '🛡️' },
      { id: '6', name: '疾病预防', count: 22, icon: '🏥' },
      { id: '7', name: '亲子关系', count: 16, icon: '👨‍👩‍👧‍👦' },
      { id: '8', name: '教育方法', count: 28, icon: '📚' },
      { id: '9', name: '成长发育', count: 19, icon: '📈' },
      { id: '10', name: '行为习惯', count: 14, icon: '✨' }
    ],
    selectedCategoryId: '1', // 默认选中第一个分类
    selectedCategoryName: '新生儿护理', // 当前选中分类名称
    selectedCategoryArticles: [] as Article[] // 当前选中分类的文章列表
  },
  
  onLoad() {
    // 延迟执行，避免初始化问题
    setTimeout(() => {
      this.loadCategoryArticles('1', '新生儿护理')
    }, 100)
  },

  // 加载分类文章
  loadCategoryArticles(categoryId: string, categoryName: string) {
    // 模拟不同分类的文章数据
    const articlesData: { [key: string]: Article[] } = {
      '1': [ // 新生儿护理
        {
          id: 'a1',
          title: '新生儿喂养指南：母乳喂养的正确方法',
          summary: '详细介绍母乳喂养的姿势、频率、时间等关键要点，帮助新手妈妈建立正确的喂养习惯...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '李医生',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 5,
          readCount: 234,
          publishTime: '2024-01-15',
          isFree: true,
          tags: ['喂养', '母乳', '新生儿'],
          category: '新生儿护理'
        },
        {
          id: 'a2',
          title: '新生儿睡眠规律建立：0-3个月睡眠训练',
          summary: '科学的方法帮助宝宝建立良好的睡眠习惯，解决夜醒、入睡困难等问题...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '李医生',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 8,
          readCount: 189,
          publishTime: '2024-01-12',
          isFree: false,
          tags: ['睡眠', '训练', '0-3个月'],
          category: '新生儿护理'
        }
      ],
      '2': [ // 营养健康
        {
          id: 'b1',
          title: '宝宝辅食添加全攻略',
          summary: '科学合理的辅食添加时间、顺序和方法，确保宝宝营养均衡...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '营养师小王',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 7,
          readCount: 189,
          publishTime: '2024-01-14',
          isFree: true,
          tags: ['辅食', '营养', '健康'],
          category: '营养健康'
        }
      ],
      '3': [ // 早教启蒙
        {
          id: 'c1',
          title: '0-6个月宝宝早教游戏',
          summary: '适合0-6个月宝宝的早教游戏和活动，促进宝宝感官发育...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '早教专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 6,
          readCount: 156,
          publishTime: '2024-01-10',
          isFree: true,
          tags: ['早教', '游戏', '0-6个月'],
          category: '早教启蒙'
        }
      ],
      '4': [ // 心理健康
        {
          id: 'd1',
          title: '宝宝情绪管理指南',
          summary: '了解宝宝情绪发展的特点，学会正确处理宝宝的情绪问题...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '心理专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 9,
          readCount: 98,
          publishTime: '2024-01-08',
          isFree: true,
          tags: ['心理', '情绪', '发展'],
          category: '心理健康'
        }
      ],
      '5': [ // 安全教育
        {
          id: 'e1',
          title: '家庭安全防护措施指南',
          summary: '全面的家庭安全防护知识，保护孩子健康成长...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '安全专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 6,
          readCount: 89,
          publishTime: '2024-01-04',
          isFree: true,
          tags: ['安全', '防护', '家庭'],
          category: '安全教育'
        }
      ],
      '6': [ // 疾病预防
        {
          id: 'f1',
          title: '儿童常见疾病预防与护理',
          summary: '了解儿童常见疾病的预防措施和护理方法...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '儿科医生',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 7,
          readCount: 156,
          publishTime: '2024-01-02',
          isFree: true,
          tags: ['疾病', '预防', '护理'],
          category: '疾病预防'
        }
      ],
      '7': [ // 亲子关系
        {
          id: 'g1',
          title: '建立良好亲子关系的秘诀',
          summary: '如何与孩子建立亲密和谐的亲子关系...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '心理专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 8,
          readCount: 234,
          publishTime: '2024-01-01',
          isFree: true,
          tags: ['亲子', '关系', '沟通'],
          category: '亲子关系'
        }
      ],
      '8': [ // 教育方法
        {
          id: 'h1',
          title: '科学教育方法指南',
          summary: '掌握科学的教育理念和方法，培养优秀的孩子...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '教育专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 9,
          readCount: 298,
          publishTime: '2023-12-30',
          isFree: false,
          tags: ['教育', '方法', '科学'],
          category: '教育方法'
        }
      ],
      '9': [ // 成长发育
        {
          id: 'i1',
          title: '儿童成长发育里程碑',
          summary: '了解孩子各阶段的成长发育特点和注意事项...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '发育专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 6,
          readCount: 178,
          publishTime: '2023-12-28',
          isFree: true,
          tags: ['成长', '发育', '里程碑'],
          category: '成长发育'
        }
      ],
      '10': [ // 行为习惯
        {
          id: 'j1',
          title: '培养良好行为习惯的方法',
          summary: '如何帮助孩子养成良好的行为习惯和生活习惯...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '行为专家',
          authorAvatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          readTime: 7,
          readCount: 145,
          publishTime: '2023-12-25',
          isFree: true,
          tags: ['行为', '习惯', '培养'],
          category: '行为习惯'
        }
      ]
    }

    const articles = articlesData[categoryId] || []
    this.setData({
      selectedCategoryArticles: articles,
      selectedCategoryName: categoryName
    })
  },

  // 点击专栏卡片
  onColumnTap(e: any) {
    const columnId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/column-detail/column-detail?id=${columnId}`
    })
  },

  // 跳转到分类页面
  onCategoryTap() {
    wx.navigateTo({
      url: '/pages/category/category'
    })
  },

  // 点击分类标签
  onCategoryTabTap(e: any) {
    const category = e.currentTarget.dataset.category
    this.setData({
      selectedCategoryId: category.id
    })
    this.loadCategoryArticles(category.id, category.name)
    wx.showToast({
      title: `${category.name}：${category.count}篇文章`,
      icon: 'none',
      duration: 1500
    })
  },

  // 跳转到搜索页面
  onSearchTap() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  // 点击轮播图
  onBannerTap(e: any) {
    const link = e.currentTarget.dataset.link
    if (link) {
      wx.navigateTo({
        url: link
      })
    }
  },

  // 点击文章
  onArticleTap(e: any) {
    const articleId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/article-detail/article-detail?id=${articleId}`
    })
  },

  // 查看更多专栏
  onViewMoreColumns() {
    wx.navigateTo({
      url: '/pages/column/column'
    })
  },

  // 查看更多分类文章
  onViewMoreCategoryArticles() {
    const categoryId = this.data.selectedCategoryId
    const categoryName = this.data.selectedCategoryName
    wx.navigateTo({
      url: `/pages/article-list/article-list?categoryId=${categoryId}&categoryName=${categoryName}`
    })
  },

  // 分类滚动事件
  onCategoryScroll(_e: any) {
    // 可以在这里添加滚动相关的逻辑
  }
})