// pages/foods/foods.js
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    personLink: {
      url01: '/static/images/个人背景无阴影@2x.png',
      url02: '/static/images/个人背景无阴影@3x.png'
    },
    formdata: [
      {
        id: 1,
        name: "情人节"
      },
      {
        id: 2,
        name: "圣诞节"
      }
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShareAppMessage(options) {
    return {
      title: '聚首祝福卡片',
    }
    console.log(options.webViewUrl)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  MyPost: function (e) {
    var urlId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mypost/mypost?id=' + urlId
    })
  },
  MyJoin: function (e) {
    var urlId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/myjoin/myjoin?id=' + urlId
    })
  },


  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})
