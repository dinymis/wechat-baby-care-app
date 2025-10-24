// category.ts
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
    categories: [] as Category[],
    selectedCategory: '',
    loading: true
  },
  lifetimes: {
    attached() {
      // 延迟执行，避免初始化问题
      setTimeout(() => {
        this.loadCategories()
      }, 100)
    }
  },
  methods: {
    // 加载分类数据
    loadCategories() {
      // 模拟数据
      const categoriesData: Category[] = [
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
        }
      ]

      this.setData({
        categories: categoriesData,
        loading: false
      })
    },

    // 选择分类
    onCategoryTap(e: any) {
      const categoryId = e.currentTarget.dataset.id
      const category = this.data.categories.find(cat => cat.id === categoryId)
      
      if (category) {
        wx.navigateTo({
          url: `/pages/article-list/article-list?categoryId=${categoryId}&categoryName=${category.name}`
        })
      }
    },

    // 搜索分类
    onSearchInput(e: any) {
      const keyword = e.detail.value.toLowerCase()
      const allCategories = this.data.categories
      
      if (!keyword) {
        this.setData({
          categories: allCategories
        })
        return
      }

      const filteredCategories = allCategories.filter(category => 
        category.name.toLowerCase().includes(keyword) || 
        category.description.toLowerCase().includes(keyword)
      )

      this.setData({
        categories: filteredCategories
      })
    }
  }
})
