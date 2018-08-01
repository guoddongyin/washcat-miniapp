// pages/mycard/mycard.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carddata:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestdata();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //获取猫卡信息
  requestdata: function () {
    var that = this
    var data = {
      userId: wx.getStorageSync('IDID')
    }
    console.log("anshu",data)
    util.request_data("userCard/getUserCard", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        carddata: res.data.data
      })
    })
  },
  //跳转到猫卡详情
  carddetail: function (e) {
    var that = this
    var position = e.currentTarget.dataset.id
    var cardid = that.data.carddata[position].id
    wx.navigateTo({
      url: '/pages/carddetail/carddetail?cardid=' + cardid ,
    })
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
  
  },
  
  paidcard:function () {
    wx.navigateTo({
      url: '/pages/paidcard/paidcard',
    })
  },
  cardexchange: function () {
    wx.navigateTo({
      url: '/pages/cardexchange/cardexchange',
    })
  },
})