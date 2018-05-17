// pages/mypost/mypost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personLink: {
      url01: '/static/images/post@2x.png',
      url02: '/static/images/post@3x.png'
    },
    details:[
      {
        id:1,
        title:'江南小镇（砂之船奥莱店）',
        url:'/static/images/food.png',
        state: '满员'
      },
      {
        id: 2,
        title: '金鹰',
        url: '/static/images/food.png',
        state:'待加入'
      },
      {
        id: 3,
        title: '新街口',
        url: '/static/images/food.png',
        state: '关闭'
      }
    
    ]
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})