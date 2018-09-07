// pages/startfigure/startfigure.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startimg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getphotodata()
    this.countInterval()
  },
  //获取启动页图片
  getphotodata: function () {
    var that = this
    var data = {
      mediaType: 2
    }
    util.request_data("banner/startImg", 'POST', data, function (res) {
      console.log(res)
      var startimg = res.data.data
      that.setData({
        startimg: startimg
      })
    })
  },
  // 设置倒计时 定时器 每10000毫秒执行一次
  countInterval: function () {
    var that = this
    var Interval = setTimeout(function () {
      wx.navigateTo({
        url: '/pages/index/index',
      })
      clearTimeout(Interval); 
    }, 3000)
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