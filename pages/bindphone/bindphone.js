// pages/bindphone/bindphone.js
var interval = null //倒计时函数
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendmsg: "sendmsg",
    getmsg: "获取验证码",
    currentTime: 61,
    disable: false,
    code: '',
  },
  phonenum: function (e) {
    var that = this;
    that.setData({
      phonenum: e.detail.value
    })
  },
  code: function (e) {
    var that = this;
    that.setData({
      code: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  sendmessg: function (e) {
    var that = this
    // console.log(that.data.phonenum)
    if (that.data.phonenum == null) {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none'
      })
    } else {
      var myreg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      if (!myreg.test(that.data.phonenum)) {
        wx.showToast({
          title: '电话格式不正确',
          icon: 'none'
        })
      } else {
        var currentTime = that.data.currentTime;
        if (!that.data.disable) {
          interval = setInterval(function () {
            currentTime--;
            that.setData({
              sendmsg: "sendmsgafter",
              getmsg: currentTime + "s后重新发送",
              disable: true
              // time: currentTime + '秒',
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                sendmsg: "sendmsg",
                getmsg: "获取验证码",
                currentTime: 61,
                disabled: false
              })
            }
          }, 1000)
        }
        that.requestcode()
      }
    }
  },

  //获取验证码
  requestcode: function () {
    var that = this
    var datadata = {
      phone: that.data.phonenum,
      openId: wx.getStorageSync('openid'),
      types: 1
    }
    console.log(datadata)
    util.request_data('sms/getCode', 'POST', datadata, function (res) {
      console.log(res)
      // that.setData({
      //   code:res.data.data.code
      // })
    });
  },
  // 绑定手机号
  bindphone: function(e) {
    var that = this
    console.log(e)
    // e.detail.value
    if (that.data.phonenum == null) {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none'
      })
    } else {
      if (that.data.code == null) {
        wx.showToast({
          title: '验证码不能为空',
          icon: 'none'
        })
      } else {
        var datadata = {
          mobile: that.data.phonenum,
          openId: wx.getStorageSync('openid'),
          code: e.detail.value.pass
        }
        console.log(datadata)
        util.request_data('user/register', 'POST', datadata, function (res) {
          console.log(res)
          success: {
            console.log('ggg')
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/myinformation/myinformation',
              })
            }, 1000)
          }
          fail:{
             wx.showToast({
               title: res.errmsg,
               icon: 'fail'
             }) 
          }
        })
      }
    }
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