// pages/paidcard/paidcard.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,//默认选中第一个
    moneyArray: ''
  },
 //获取次卡信息
  getmoneyArray:function () {
    var that = this;
    var data = {}
    util.request_data("washcarCard/getWashcarCard", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        moneyArray: res.data.data,
      })
    })
  },
  //点击充值金额
  activethis: function (event) {
    var that = this;
    var thisindex = event.currentTarget.dataset.thisindex;//当前index
    this.setData({
      activeIndex: thisindex
    })
    var data = {
      openId: wx.getStorageSync('openid'),
      cardId: thisindex,
      payType:1,
      //nums:2
    }
    util.request_data("pay/unifiedCard", 'POST', data, function (res) {
      console.log(res)
      var paydata = res.data.data;
      wx.requestPayment({
        timeStamp: paydata.timeStamp,
        nonceStr: paydata.nonceStr,
        package: paydata.package,
        signType: paydata.signType,                                                            
        paySign: paydata.paySign,
        success: function (res) {
          console.log('成功')
          wx.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 1500
          })
          // console.log('成功')
          wx.navigateTo({
            url: '/pages/carddetail/carddetail',
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
      // wx.navigateTo({
      //   url: '/pages/paynow/paynow',
      // })
    })
  },
  //自定义充值金额
  paymyself: function (event) {
    var that = this;
    var thisindex = event.currentTarget.dataset.thisindex;//当前index
    this.setData({
      activeIndex: thisindex
    })
    var data = {
      openId: wx.getStorageSync('openid'),
      cardId: thisindex,
      payType: 2,
      nums:2
    }
    util.request_data("pay/unifiedCard", 'POST', data, function (res) {
      console.log(res)
      var paydata = res.data.data;
      wx.navigateTo({
        url: '/pages/paynow/paynow',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmoneyArray();
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