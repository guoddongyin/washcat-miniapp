// pages/cardexchange/cardexchange.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code2: function (e) {   //获取兑换码输入的值
      var that = this;
      that.setData({
        code2: e.detail.value
      })
    },

  },
  getformdata:function(e){
    var that = this
    var code2 = e.detail.value.code2
    if (code2.length == 0) {
      wx.showToast({
        title: '兑换码不能为空',
        icon: 'none',
      })
    // } else if (code2 != that.code){
    //   wx.showToast({
    //     title: '兑换码错误',
    //     icon: 'none',
    //   })
    }else{
      var data = {
        code: code2,
        userId: wx.getStorageSync('IDID'),
      }
      util.request_data("washcarCardCouponCode/exchangeCouponCode", 'POST', data, function (res) {
        console.log(res)
        success: {
          console.log('ggg')
          wx.showToast({
            title: '兑换成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/mycard/mycard',
            })
          }, 1000)
        }
        // fail: {
        //   wx.showToast({
        //     title: 'res.errcode.errmsg',
        //     icon: 'none',
        //     // duration: 1000
        //   })
        // }
      })
    }
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