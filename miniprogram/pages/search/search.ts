// search.ts
interface SearchResult {
  id: string
  type: 'article' | 'column' | 'author'
  title: string
  description: string
  coverImage: string
  author?: string
  publishTime?: string
  readCount?: number
  articleCount?: number
  tags?: string[]
}

interface HotKeyword {
  id: string
  keyword: string
  count: number
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  articleCount: number
  columnCount: number
  isHot: boolean
}

Component({
  data: {
    searchKeyword: '',
    searchResults: [] as SearchResult[],
    hotKeywords: [] as HotKeyword[],
    searchHistory: [] as string[],
    showResults: false,
    loading: false,
    currentTab: 'all', // all, articles, columns, authors
    tabs: [
      { value: 'all', label: '全部' },
      { value: 'articles', label: '文章' },
      { value: 'columns', label: '专栏' },
      { value: 'authors', label: '作者' }
    ],
    // 分类数据 - 与分类页面保持一致
    categories: [
      {
        id: '1',
        name: '新生儿护理',
        description: '0-1岁宝宝护理知识',
        icon: '👶',
        color: '#FF6B6B',
        articleCount: 25,
        columnCount: 3,
        isHot: true
      },
      {
        id: '2',
        name: '营养健康',
        description: '儿童营养与健康管理',
        icon: '🥗',
        color: '#4ECDC4',
        articleCount: 18,
        columnCount: 2,
        isHot: true
      },
      {
        id: '3',
        name: '早教启蒙',
        description: '科学早教方法',
        icon: '🧠',
        color: '#45B7D1',
        articleCount: 32,
        columnCount: 4,
        isHot: false
      },
      {
        id: '4',
        name: '心理健康',
        description: '儿童心理发展',
        icon: '💝',
        color: '#96CEB4',
        articleCount: 20,
        columnCount: 2,
        isHot: false
      },
      {
        id: '5',
        name: '安全教育',
        description: '儿童安全防护',
        icon: '🛡️',
        color: '#FFEAA7',
        articleCount: 15,
        columnCount: 1,
        isHot: false
      },
      {
        id: '6',
        name: '疾病预防',
        description: '常见疾病预防护理',
        icon: '🏥',
        color: '#DDA0DD',
        articleCount: 22,
        columnCount: 3,
        isHot: false
      },
      {
        id: '7',
        name: '亲子关系',
        description: '建立良好亲子关系',
        icon: '👨‍👩‍👧‍👦',
        color: '#98D8C8',
        articleCount: 16,
        columnCount: 2,
        isHot: false
      },
      {
        id: '8',
        name: '教育方法',
        description: '科学教育理念',
        icon: '📚',
        color: '#F7DC6F',
        articleCount: 28,
        columnCount: 3,
        isHot: false
      },
      {
        id: '9',
        name: '成长发育',
        description: '儿童成长里程碑',
        icon: '📈',
        color: '#A8E6CF',
        articleCount: 19,
        columnCount: 2,
        isHot: false
      },
      {
        id: '10',
        name: '行为习惯',
        description: '培养良好行为习惯',
        icon: '✨',
        color: '#FFD93D',
        articleCount: 14,
        columnCount: 1,
        isHot: false
      }
    ] as Category[]
  },
  lifetimes: {
    attached() {
      // 延迟执行，避免初始化问题
      setTimeout(() => {
        this.loadHotKeywords()
        this.loadSearchHistory()
      }, 100)
    }
  },
  methods: {
    // 加载热门关键词
    loadHotKeywords() {
      const hotKeywordsData: HotKeyword[] = [
        { id: '1', keyword: '新生儿护理', count: 1234 },
        { id: '2', keyword: '母乳喂养', count: 856 },
        { id: '3', keyword: '宝宝睡眠', count: 743 },
        { id: '4', keyword: '辅食添加', count: 692 },
        { id: '5', keyword: '疫苗接种', count: 567 },
        { id: '6', keyword: '早教启蒙', count: 445 },
        { id: '7', keyword: '儿童营养', count: 398 },
        { id: '8', keyword: '安全防护', count: 321 }
      ]

      this.setData({
        hotKeywords: hotKeywordsData
      })
    },

    // 加载搜索历史
    loadSearchHistory() {
      const history = wx.getStorageSync('searchHistory') || []
      this.setData({
        searchHistory: history.slice(0, 10) // 最多显示10条历史记录
      })
    },

    // 保存搜索历史
    saveSearchHistory(keyword: string) {
      let history = wx.getStorageSync('searchHistory') || []
      
      // 移除重复项
      history = history.filter((item: string) => item !== keyword)
      
      // 添加到开头
      history.unshift(keyword)
      
      // 限制历史记录数量
      history = history.slice(0, 20)
      
      wx.setStorageSync('searchHistory', history)
      this.setData({
        searchHistory: history.slice(0, 10)
      })
    },

    // 输入搜索关键词
    onSearchInput(e: any) {
      const keyword = e.detail.value
      this.setData({
        searchKeyword: keyword
      })

      if (keyword.trim()) {
        this.performSearch(keyword)
      } else {
        this.setData({
          showResults: false,
          searchResults: []
        })
      }
    },

    // 执行搜索
    performSearch(keyword: string) {
      this.setData({
        loading: true,
        showResults: true
      })

      // 真实的搜索数据源
      const searchData: SearchResult[] = [
        // 新生儿护理相关
        {
          id: '1',
          type: 'article',
          title: '新生儿喂养指南：母乳喂养的正确方法',
          description: '详细介绍母乳喂养的姿势、频率、时间等关键要点，帮助新手妈妈建立正确的喂养习惯',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '李医生',
          publishTime: '2024-01-15',
          readCount: 234,
          tags: ['喂养', '母乳', '新生儿']
        },
        {
          id: '2',
          type: 'article',
          title: '新生儿护理基础知识大全',
          description: '从出生到满月的新生儿护理要点，包括洗澡、换尿布、脐带护理等',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '王护士',
          publishTime: '2024-01-10',
          readCount: 189,
          tags: ['新生儿', '护理', '基础']
        },
        {
          id: '3',
          type: 'column',
          title: '0-1岁宝宝护理指南',
          description: '专业的新生儿护理知识，帮助新手父母更好地照顾宝宝',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '李医生',
          articleCount: 25,
          readCount: 1234,
          tags: ['新生儿', '护理', '0-1岁']
        },
        // 营养健康相关
        {
          id: '4',
          type: 'article',
          title: '宝宝辅食添加全攻略',
          description: '科学合理的辅食添加时间、顺序和方法，确保宝宝营养均衡',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '营养师小王',
          publishTime: '2024-01-14',
          readCount: 189,
          tags: ['辅食', '营养', '健康']
        },
        {
          id: '5',
          type: 'article',
          title: '儿童营养搭配指南',
          description: '不同年龄段儿童的营养需求和食物搭配建议',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '营养师小王',
          publishTime: '2024-01-08',
          readCount: 156,
          tags: ['营养', '搭配', '儿童']
        },
        // 早教启蒙相关
        {
          id: '6',
          type: 'article',
          title: '0-6个月宝宝早教游戏',
          description: '适合0-6个月宝宝的早教游戏和活动，促进宝宝感官发育',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '早教专家',
          publishTime: '2024-01-10',
          readCount: 156,
          tags: ['早教', '游戏', '0-6个月']
        },
        {
          id: '7',
          type: 'column',
          title: '科学早教启蒙课堂',
          description: '科学的早教方法和启蒙教育指导',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '早教专家',
          articleCount: 32,
          readCount: 2156,
          tags: ['早教', '启蒙', '教育']
        },
        // 心理健康相关
        {
          id: '8',
          type: 'article',
          title: '宝宝情绪管理指南',
          description: '了解宝宝情绪发展的特点，学会正确处理宝宝的情绪问题',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '心理专家',
          publishTime: '2024-01-08',
          readCount: 98,
          tags: ['心理', '情绪', '发展']
        },
        // 安全教育相关
        {
          id: '9',
          type: 'article',
          title: '家庭安全防护措施指南',
          description: '全面的家庭安全防护知识，保护孩子健康成长',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '安全专家',
          publishTime: '2024-01-04',
          readCount: 89,
          tags: ['安全', '防护', '家庭']
        },
        // 疾病预防相关
        {
          id: '10',
          type: 'article',
          title: '儿童常见疾病预防与护理',
          description: '了解儿童常见疾病的预防措施和护理方法',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '儿科医生',
          publishTime: '2024-01-02',
          readCount: 156,
          tags: ['疾病', '预防', '护理']
        },
        // 亲子关系相关
        {
          id: '11',
          type: 'article',
          title: '建立良好亲子关系的秘诀',
          description: '如何与孩子建立亲密和谐的亲子关系',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '心理专家',
          publishTime: '2024-01-01',
          readCount: 234,
          tags: ['亲子', '关系', '沟通']
        },
        // 教育方法相关
        {
          id: '12',
          type: 'article',
          title: '科学教育方法指南',
          description: '掌握科学的教育理念和方法，培养优秀的孩子',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '教育专家',
          publishTime: '2023-12-30',
          readCount: 298,
          tags: ['教育', '方法', '科学']
        },
        // 成长发育相关
        {
          id: '13',
          type: 'article',
          title: '儿童成长发育里程碑',
          description: '了解孩子各阶段的成长发育特点和注意事项',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '发育专家',
          publishTime: '2023-12-28',
          readCount: 178,
          tags: ['成长', '发育', '里程碑']
        },
        // 行为习惯相关
        {
          id: '14',
          type: 'article',
          title: '培养良好行为习惯的方法',
          description: '如何帮助孩子养成良好的行为习惯和生活习惯',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '行为专家',
          publishTime: '2023-12-25',
          readCount: 145,
          tags: ['行为', '习惯', '培养']
        },
        // 作者信息
        {
          id: '15',
          type: 'author',
          title: '李医生',
          description: '资深儿科医生，专注新生儿护理领域10年',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        {
          id: '16',
          type: 'author',
          title: '营养师小王',
          description: '专业儿童营养师，擅长儿童营养搭配和健康管理',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }
      ]

      // 实现真正的标题匹配搜索
      const filteredResults = this.filterSearchResults(searchData, keyword)

      // 模拟搜索延迟
      setTimeout(() => {
        this.setData({
          searchResults: filteredResults,
          loading: false
        })
      }, 300)
    },

    // 过滤搜索结果 - 实现真正的标题匹配
    filterSearchResults(data: SearchResult[], keyword: string): SearchResult[] {
      if (!keyword.trim()) {
        return []
      }

      const lowerKeyword = keyword.toLowerCase().trim()
      
      return data.filter(item => {
        // 匹配标题
        if (item.title.toLowerCase().includes(lowerKeyword)) {
          return true
        }
        
        // 匹配描述
        if (item.description && item.description.toLowerCase().includes(lowerKeyword)) {
          return true
        }
        
        // 匹配标签
        if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))) {
          return true
        }
        
        // 匹配作者
        if (item.author && item.author.toLowerCase().includes(lowerKeyword)) {
          return true
        }
        
        return false
      }).sort((a, b) => {
        // 优先显示标题完全匹配的结果
        const aTitleMatch = a.title.toLowerCase().includes(lowerKeyword)
        const bTitleMatch = b.title.toLowerCase().includes(lowerKeyword)
        
        if (aTitleMatch && !bTitleMatch) return -1
        if (!aTitleMatch && bTitleMatch) return 1
        
        // 其次按阅读量排序
        const aReadCount = a.readCount || 0
        const bReadCount = b.readCount || 0
        
        return bReadCount - aReadCount
      })
    },

    // 点击搜索
    onSearchConfirm() {
      const keyword = this.data.searchKeyword.trim()
      if (keyword) {
        this.saveSearchHistory(keyword)
        this.performSearch(keyword)
      }
    },

    // 点击热门关键词
    onHotKeywordTap(e: any) {
      const keyword = e.currentTarget.dataset.keyword
      this.setData({
        searchKeyword: keyword
      })
      this.saveSearchHistory(keyword)
      this.performSearch(keyword)
    },

    // 点击搜索历史
    onHistoryTap(e: any) {
      const keyword = e.currentTarget.dataset.keyword
      this.setData({
        searchKeyword: keyword
      })
      this.performSearch(keyword)
    },

    // 清除搜索历史
    onClearHistory() {
      wx.removeStorageSync('searchHistory')
      this.setData({
        searchHistory: []
      })
      wx.showToast({
        title: '清除成功',
        icon: 'success'
      })
    },

    // 切换标签页
    onTabChange(e: any) {
      const tab = e.currentTarget.dataset.tab
      this.setData({
        currentTab: tab
      })
    },

    // 点击搜索结果
    onResultTap(e: any) {
      const result = e.currentTarget.dataset.result
      
      if (result.type === 'article') {
        wx.navigateTo({
          url: `/pages/article-detail/article-detail?id=${result.id}`
        })
      } else if (result.type === 'column') {
        wx.navigateTo({
          url: `/pages/column-detail/column-detail?id=${result.id}`
        })
      } else if (result.type === 'author') {
        // 跳转到作者页面或专栏列表
        wx.navigateTo({
          url: `/pages/column/column?author=${result.title}`
        })
      }
    },

    // 删除搜索历史项
    onDeleteHistory(e: any) {
      const keyword = e.currentTarget.dataset.keyword
      let history = this.data.searchHistory.filter(item => item !== keyword)
      
      wx.setStorageSync('searchHistory', history)
      this.setData({
        searchHistory: history
      })
    },

    // 点击分类标签
    onCategoryTap(e: any) {
      const category = e.currentTarget.dataset.category
      
      // 跳转到分类页面
      wx.navigateTo({
        url: `/pages/category/category?categoryId=${category.id}&categoryName=${category.name}`
      })
    }
  }
})
