// pages/paynow/paynow.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isxuan: false,
    getstationdata:'',
    devId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var devId = options.devId
    this.data.devId = devId
    this.getstationdata()
  },
  //获取支付信息
  getstationdata: function (e) {
    var that = this
    var data = {
      devId: that.data.devId
    }
    util.request_data("washcardevStatus/getDev", 'POST', data, function (res) {
      console.log(res)
      var stationlist = res.data.data
      that.setData({
        stationlist: stationlist,
      })
    })
  },

  //微信支付
  weixinpay: function (e) {
    var that = this;
    var id = that.data.devId
    var data = {
      openId: wx.getStorageSync('openid'),
      orderSource:1,
      devId: that.data.devId,
      washPriceSign: wx.getStorageSync('washPriceSign')
    }
    console.log(data)
    util.request_data("pay/unifiedWash", 'POST', data, function (res) {
      console.log(res)
      var paydata = res.data.data;
      wx.setStorageSync("orderId", paydata.orderId);
      wx.requestPayment({
        timeStamp: paydata.timeStamp,
        nonceStr: paydata.nonceStr,
        package: paydata.package,
        signType: paydata.signType,
        paySign: paydata.paySign,
        success: function (res) {
          console.log('成功')
          // wx.showToast({
          //   title: '支付成功',
          //   icon: 'none',
          //   duration: 1500
          // })
          // console.log('成功')
          wx.navigateTo({
            url: '/pages/paysucesscard/paysucesscard?devId=' + id,
          })
        },
        fail: function (res) {
          // console.log('失败')
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    })
  },
  //猫卡支付
  maokapay:function () {
    var that = this;
    var id = that.data.devId
    wx.navigateTo({
      url: '/pages/choosecard/choosecard?devId=' + id,
    })
  },
  //协议
  xieyi : function (){
    wx.navigateTo({
      url: '/pages/xieyi/xieyi',
    })
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