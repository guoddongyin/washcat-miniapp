// pages/carddetail/carddetail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carddatainfo:'',//，猫卡信息
    carddata:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.requestdata();
  },
  requestdata: function () {
    var that = this
    var data = {
      userId: wx.getStorageSync('IDID')
    }

    util.request_data("userCardNums/getUserCardNums", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        carddatainfo: res.data.data
      })
    })
    // util.request_data("userCard/getUserCard", 'POST', data, function (e) {
    //   console.log(res)
    //   that.setData({
    //     carddata: res.data.data
    //   })
    // })
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
  
  },
  numberdetail:function(){
    wx.navigateTo({
      url: '/pages/numberdetail/numberdetail',
    })
  }
})