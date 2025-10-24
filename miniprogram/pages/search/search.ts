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
  count: number
  icon: string
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

      // 模拟搜索数据
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'article',
          title: '新生儿喂养指南：母乳喂养的正确方法',
          description: '详细介绍母乳喂养的姿势、频率、时间等关键要点...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '李医生',
          publishTime: '2024-01-15',
          readCount: 234,
          tags: ['喂养', '母乳', '新生儿']
        },
        {
          id: '2',
          type: 'column',
          title: '0-1岁宝宝护理指南',
          description: '专业的新生儿护理知识，帮助新手父母更好地照顾宝宝',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '李医生',
          articleCount: 25,
          readCount: 1234,
          tags: ['新生儿', '护理', '0-1岁']
        },
        {
          id: '3',
          type: 'article',
          title: '宝宝睡眠规律建立：0-3个月睡眠训练',
          description: '科学的方法帮助宝宝建立良好的睡眠习惯...',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
          author: '李医生',
          publishTime: '2024-01-12',
          readCount: 189,
          tags: ['睡眠', '训练', '0-3个月']
        },
        {
          id: '4',
          type: 'author',
          title: '李医生',
          description: '资深儿科医生，专注新生儿护理领域10年',
          coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }
      ]

      // 模拟搜索延迟
      setTimeout(() => {
        this.setData({
          searchResults: mockResults,
          loading: false
        })
      }, 500)
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
