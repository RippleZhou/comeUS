// 获取应用实例
import { Data } from './index.data.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    latitude: '',//纬度，浮点数，范围为-90~90，负数表示南纬
    longitude: '', //经度，浮点数，范围为-180~180，负数表示西经
    filterIndexStatus: -1, //通过此变量来控制浮层和筛选条件 -1默认，0附件，1服务，2排序
    bannerLink: {
      url01: '/static/images/banner.png',
      url02: '/static/images/bannerlarge.png'
    },
    filterInit: ['附近', '服务', '排序'],
    filter: ['附近', '服务', '排序'],
    options: [
      ['不限', '5公里以内', '10公里以内', '20公里以内'],
      ['不限', '简餐', '轰趴', '西餐', '中餐'],
      ['不限', '智能排序', '服务排序', '距离最近']
    ],
    imgArrowUp: '/static/images/select1@2x.png',
    imgArrowDown: '/static/images/select2@2x.png',
    imgArrowChecked: '/static/images/select3@2x.png',
    garages: Data,/*商家*/
    isEmpty: true,
    loading: false,
    pageNum: 1,
    pageSize: 20,
    pageTotal: 0,
    filterSelections: [
      { index: 0 },
      { index: 0 },
      { index: 0 }
    ],
    select: {
      distance: 0,
      serve: 0,
      sort: 0
    }
  },

  /**
   * 调用的事件
  */
  filtering: function (e) {
    let that = this
    let count = wx.getStorageSync('count')
    if (count === e.currentTarget.dataset.index && this.data.filterIndexStatus > -1) {
      that.setData({
        filterIndexStatus: -1
      })
    } else {
      that.setData({
        filterIndexStatus: e.currentTarget.dataset.index
      })
    }
    wx.setStorageSync('count', e.currentTarget.dataset.index)
    wx.stopPullDownRefresh()
  },

  /**
   *  点击切换
  */
  selecting: function (e) {
    let that = this
    that.data.loading = true
    that.data.pageNum = 1
    let distance = ''
    let serve = ''
    let sort = ''
    let distanceStorage = wx.getStorageSync('distance')
    let serveStorage = wx.getStorageSync('serve')
    let sortStorage = wx.getStorageSync('sort')
    this.data.filter[this.data.filterIndexStatus] = this.data.options[this.data.filterIndexStatus][e.target.dataset.index]
    if (this.data.filter[this.data.filterIndexStatus] === '不限') {
      this.data.filter[this.data.filterIndexStatus] = this.data.filterInit[this.data.filterIndexStatus]
    }
    this.setData({
      filter: this.data.filter
    })
    if (this.data.filterIndexStatus === 0) {
      switch (e.target.dataset.item) {
        case '不限':
          that.data.select.distance = ''
          break
        case '5公里以内':
          that.data.select.distance = 5000
          break
        case '10公里以内':
          that.data.select.distance = 10000
          break
        case '20公里以内':
          that.data.select.distance = 20000
          break
      }
    }

    switch (this.data.filterIndexStatus) {
      case -1:
        break
      case 0:
        break
      case 1:
        that.data.select.serve = e.target.dataset.index
        that.data.select.serve = that.data.select.serve > 0 ? that.data.select.serve : ''
        break
      case 2:
        that.data.select.sort = e.target.dataset.index
        that.data.select.sort = that.data.select.sort > 0 ? that.data.select.sort : ''
        break
    }
    this.data.filterSelections[e.target.dataset.filterIndexStatus].index = e.target.dataset.index
    this.setData({
      filterSelections: this.data.filterSelections
    })
    setTimeout(() => {
      this.setData({
        // filter: this.data.filter,
        filterIndexStatus: -1
      })
    }, 200)
    wx.setStorageSync('distance', that.data.select.distance)
    wx.setStorageSync('serve', that.data.select.serve)
    wx.setStorageSync('sort', that.data.select.sort)
    distanceStorage = that.data.select.distance
    serveStorage = that.data.select.serve
    sortStorage = that.data.select.sort
    // 调用接口
    let params = {
      distanceLimit: distanceStorage || null,
      businessType: serveStorage || null,
      sortType: sortStorage || null,
      lat: String(that.data.latitude),
      lng: String(that.data.longitude)
    }
    // app.https.post(`/user/garage/business/page?pageNum=${that.data.pageNum}&pageSize=${that.data.pageSize}`, JSON.stringify(params), function (res) {
    //   if (res.result === 0) {
    //     that.data.pageTotal = res.data.pageTotal
    //     if (that.data.latitude) {
    //       res.data.page.forEach((element, index) => {
    //         if (parseFloat(element.distance) < 1000) {
    //           element.finalDistance = `${parseFloat(element.distance)} M`
    //         } else if (parseFloat(element.distance) >= 1000) {
    //           element.finalDistance = `${(Math.round(parseFloat(element.distance) / 100) / 10).toFixed(1)} KM`
    //         }
    //       })
    //     }
    //     that.setData({
    //       garages: res.data.page
    //     })
    //     that.data.loading = false
    //   }
    // })
  },

  /**
   *调取列表接口
  */
  getInitList: function (pageNum = 1) {
    let that = this
    that.data.loading = true
    let totalgarages = []
    that.data.pageNum = pageNum
    let params = {}
    params = {
      lat: String(that.data.latitude),
      lng: String(that.data.longitude),
      distanceLimit: that.data.select.distance || null,
      businessType: that.data.select.serve || null,
      sortType: that.data.select.sort || null
    }
    // wx.showNavigationBarLoading()
    // app.https.post(`/user/garage/business/page?pageNum=${that.data.pageNum}&pageSize=${that.data.pageSize}`, JSON.stringify(params), function (res) {
    //   if (res.result === 0) {
    //     that.data.pageTotal = res.data.pageTotal
    //     if (that.data.pageTotal < that.data.pageNum) {
    //       that.data.loading = false
    //       return
    //     }
    //     let garages = res.data.page
    //     if (that.data.latitude) {
    //       garages.forEach((element, index) => {
    //         if (parseFloat(element.distance) < 1000) {
    //           element.finalDistance = `${parseFloat(element.distance)} M`
    //         } else if (parseFloat(element.distance) >= 1000) {
    //           element.finalDistance = `${(Math.round(parseFloat(element.distance) / 100) / 10).toFixed(1)} KM`
    //         }
    //       })
    //     }
    //     if (!that.data.isEmpty) {
    //       totalgarages = that.data.garages.concat(garages)
    //     } else {
    //       totalgarages = garages
    //       that.data.isEmpty = false
    //     }
    //     that.setData({
    //       garages: totalgarages
    //     })
    //     that.data.loading = false
    //   }
    // })
  },

  /**
   * 点击浮层区域关闭掉浮层
  */
  closeMask: function (e) {
    if (e.target.dataset.mask) {
      this.setData({
        filterIndexStatus: -1
      })
    }
  },

  /**
   * 跳转列表页
  */
  listDetail: function (e) {
    app.globalData.repairFactory = e.currentTarget
      .dataset.info
    e.currentTarget
      .dataset.info.latitude = this.data.latitude
    e.currentTarget
      .dataset.info.longitude = this.data.longitude
    let info = {
      "id": e.currentTarget
        .dataset.info.id,
      "latitude": this.data.latitude,
      "longitude": this.data.longitude
    }
    let propsInfo = JSON.stringify(info)
    wx.navigateTo({
      url: `/pages/detail/detail?info=${propsInfo}`
    })
  },

  /**
   * 用户信息和地理位置授权
  */
  getUserInfo: function () {
    let that = this
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function (res) {
        app.globalData.userInfo = res.userInfo
        // 授权获取地理位置接口
        res.authSetting = {
          "scope.userLocation": true
        }
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            that.data.latitude = res.latitude
            that.data.longitude = res.longitude
            app.globalData.latitude = res.latitude
            app.globalData.longitude = res.longitude
            that.data.isEmpty = true
            that.getInitList(1)
          },
          fail: function (res) {
            that.data.isEmpty = true
            that.getInitList(1, true)
          }
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 调用授权函数
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    let scope = {
      "userInfo": false,
      "userLocation": false
    }
    new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          scope.userInfo = res.authSetting["scope.userInfo"]
          scope.userLocation = res.authSetting["scope.userLocation"]
          resolve(true)
        }
      })
    }).then((result) => {
      if (!result) {
        return
      }
      // 如果没有开启定位功能可选择开启定位功能
      if (!scope.userLocation) {
        wx.openSetting({
          success: (res) => {
            res.authSetting = {
              "scope.userInfo": true,
              "scope.userLocation": true
            }
            wx.getLocation({
              type: 'gcj02',
              success: function (res) {
                that.data.latitude = res.latitude
                that.data.longitude = res.longitude
                app.globalData.latitude = res.latitude
                app.globalData.longitude = res.longitude
                wx.setStorageSync('locationLatitude', that.data.latitude)
                that.data.isEmpty = true
                that.getInitList(1)
              },
              fail: function (res) {
                that.data.isEmpty = true
                that.getInitList(1)
              }
            })
          }
        })
      }
      if (this.data.select.distance || this.data.select.serve || this.data.select.sort) {
        that.data.pageNum = 1
        this.selecting()
        wx.stopPullDownRefresh()
        return
      }
      that.data.isEmpty = true
      this.getInitList(1)
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pageTotal > this.data.pageNum && !this.data.loading) {
      this.data.pageNum++
      this.getInitList(this.data.pageNum)
    }
  },

  /**
   * 用户点击右上角分享分享
   */
  onShareAppMessage: function () {
  },
  onLaunch: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})