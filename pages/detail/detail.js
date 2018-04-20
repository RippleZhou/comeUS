// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: app.https.imageUrl,
    repairFactoryInfo: {},
    selectedInfo: {},
    currentIndex: 1,
    cotalNumber: 0,
    defaultPath: '',
    simulation: [
      { path: '/images/cars/1.jpg' },
      { path: '/images/cars/2.jpg' },
      { path: '/images/cars/3.jpg' },
      { path: '/images/cars/4.jpg' },
      { path: '/images/cars/5.jpg' },
      { path: '/images/cars/6.jpg' }
    ],
    showModal: false
  },

  slideChange: function (e) {
    this.setData({
      currentIndex: e.detail.current + 1
    })
  },
  listDetail: function (params) {
    let that = this
    app.https.post('/user/garage/getGarageDetail', JSON.stringify(params), function (res) {
      if (res.result === 0) {
        for (let key in res.data) {
          res.data.distance = app.globalData.repairFactory.distance
          if (parseFloat(res.data.distance) < 1000) {
            res.data.finalDistance = `${parseFloat(res.data.distance)}m`
          } else if (parseFloat(res.data.distance) >= 1000) {
            res.data.finalDistance = `${(Math.round(parseFloat(res.data.distance) / 100) / 10).toFixed(1)}km`
          }
        }
        wx.setNavigationBarTitle({
          title: res.data.companyName
        })
        that.setData({
          repairFactoryInfo: res.data,
          cotalNumber: res.data.photos.length
        })
      }
    })
  },
  // 打开地图查看位置
  openMap: function (e) {
    let that = this
    if (!that.data.repairFactoryInfo.lat) {
      wx.showToast({
        title: '商家未上传位置',
        icon: 'success',
        duration: 2000
      })
      return
    }
    wx.openLocation({
      latitude: parseFloat(that.data.repairFactoryInfo.lat) || '',//目的地维度
      longitude: parseFloat(that.data.repairFactoryInfo.lng) || '',//目的地精度
      name: that.data.repairFactoryInfo.companyName,//目的地位置名称
      address: that.data.repairFactoryInfo.address//目的地地址
    })
  },
  phoneCall: function (e) {
    let that = this
    if (!that.data.repairFactoryInfo.managerPhone) {
      // wx.showModal({
      //   title:`\r\n该店长暂未上传联系方式`,
      //   showCancel: false,
      //   confirmText: '关闭'
      // })
      that.setData({
        showModal: true
      })
      return
    }
    wx.makePhoneCall({
      phoneNumber: that.data.repairFactoryInfo.managerPhone,
      success: function () {
      },
      fail: function () {
        console.log("拨打电话失败！")
      },
      complete: function () {
      }
    })
  },
  // 弹出框蒙层截断touchmove事件
  preventTouchMove: function (e) {
  },
  // 隐藏模态对话框
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  // 模态框取消按钮事件
  onCancel: function () {
    this.hideModal();
  },
  // 模态框确认按钮事件
  onConfirm: function () {
    this.hideModal();
  },
  //预览图片
  showImage: function (e) {
    let that = this.data
    let arr = []
    for (let i = 0; i < e.target.dataset.urls.length; i++) {
      arr.push(that.imageUrl + e.target.dataset.urls[i].url)
    }
    wx.previewImage({
      current: that.imageUrl + e.target.dataset.url, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  // 店长头像预览图片
  imageAvatar: function (e) {
    let that = this.data
    let arr = []
    arr.push(that.imageUrl + e.target.dataset.avatar)
    wx.previewImage({
      current: that.imageUrl + e.target.dataset.avatar,
      urls: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (info) {
    let that = this
    that.data.selectedInfo = JSON.parse(info.info)
    if (!that.data.selectedInfo.latitude) {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          that.data.selectedInfo.latitude = res.latitude
          that.data.selectedInfo.longitude = res.longitude
        },
        fail: function (res) {
        }
      })
    }
    this.setData({
      selectedInfo: that.data.selectedInfo,
      defaultPath: '/images/default_large@2x.jpg'
    })
    wx.setStorageSync('selectedInfo', info)
    setTimeout(() => {
      let params = {
        companyId: this.data.selectedInfo.id,
        lat: this.data.selectedInfo.latitude,
        lng: this.data.selectedInfo.longitude
      }
      this.listDetail(params)
    }, 400)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this
    let selectedInfo = JSON.parse(wx.getStorageSync('selectedInfo').info)
    let propsInfo = JSON.stringify(selectedInfo)
    delete selectedInfo.latitude
    delete selectedInfo.longitude
    return {
      path: `/pages/list-detail/list-detail?info=${propsInfo}`,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  }
})