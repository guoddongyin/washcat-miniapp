// pages/buycard/buycard.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qycarddata: '',//卡劵信息
    status:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.getcardinfo()
  },
   //获取姓名输入的值
  name2: function (e) {  
    var that = this;
    that.setData({
      name2: e.detail.value
    })
  },
  //获取卡劵信息
  getcardinfo: function () {
    var that = this
    var data = {
      cardTypes: 2
    }
    util.request_data('washcarCardCoupon/getWashcarCardCoupon', 'POST', data, function (res) {
      console.log(res)
      var qycarddata = res.data.data
      qycarddata.createTime = util.DateHelper(qycarddata.createTime, 'yyyy-MM-dd')
      qycarddata.effectiveTime = util.DateHelper(qycarddata.effectiveTime, 'yyyy-MM-dd')
      that.setData({
        qycarddata: qycarddata
      })
    })
  },
  //支付
  formSubmit: function (e) {
    var that = this;
    var name2 = e.detail.value.name2;
    if (name2==''){  
    }else{
      userName: name2
    }
    var data = {
      openId: wx.getStorageSync('openid'),
      devId: that.data.qycarddata.devId,
      couponId: that.data.qycarddata.id,
      cardTypes: 2,
      userName: name2
    }
    util.request_data("pay/unifiedCardCoupon", 'POST', data, function (res) {
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
          wx.navigateTo({
            url: '/pages/mycard/mycard',
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
  stationlist: function () {
    var statu = this.data.status
    wx.navigateTo({
      url: '/pages/stationlist/stationlist?status=' + statu,
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