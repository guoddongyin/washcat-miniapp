// pages/personal/personal.js 
  /**
   * 页面的初始数据
   */
var util = require('../../utils/util.js')
 var app = getApp()
Page({
  data: {
    islogin: true,
    isvisible: false,
    userinfo: '',//用户信息
    portrait:'',//头像
    defaultImg: "../../images/icon_moren.png", //默认图片
    isBranch:'',
    qyerrcode:'',
    gxerrcode:''
  },

    onLoad: function () {
      //获取个人信息
      this.requestdata();
      this.isBranch();
      this.isgxcard();
      this.isqycard();
    },
  //判断是否是加盟商
  isBranch: function () {
    var that = this;
    //var masknomsg = 
    var data = {
      phone: wx.getStorageSync('mobile'),
      masknomsg:true
    }
    if(data.phone==''){

    }else{
      util.request_data("branch/isBranch", 'POST', data, function (res) {
        console.log(res)
        var isBranch = res.data.errcode
        that.setData({
          isBranch: isBranch
        })
      })
    } 
  },
  //判断是否有共享卡
  isgxcard: function () {
    var that = this
    var data = {
      cardTypes: 2,
      masknomsg: true
    }
    util.request_data('washcarCardCoupon/getWashcarCardCoupon', 'POST', data, function (res) {
      console.log(res)
      var gxerrcode = res.data.errcode
      that.setData({
        gxerrcode: gxerrcode
      })
    })
  },
  //判断是否有企业卡
  isqycard: function () {
    var that = this
    var data = {
      cardTypes: 3,
      masknomsg: true
    }
    util.request_data('washcarCardCoupon/getWashcarCardCoupon', 'POST', data, function (res) {
      console.log(res)
      var qyerrcode = res.data.errcode
      that.setData({
        qyerrcode: qyerrcode
      })
    })
  },
    //获取个人信息
    requestdata: function () {
      var that = this
      var data = {
        openId: wx.getStorageSync('openid')
      }
      console.log("参数",data);
      util.request_data("user/getUser", 'POST', data, function (res) {
        console.log(res)
        that.setData({
          userinfo: res.data.data,
          portrait:res.data.data.avatar
        })
      })
    },
    /**
 * 图片加载错误触发的事件
 */
    errorFunction: function (e) {
      console.log(e)
      if (e.type == "error") {
        this.data.userinfo.avatar = this.data.defaultImg //错误图片替换为默认图片
        this.setData({
          userinfo: this.data.userinfo
        })
      }
    },
  paycard:function(){
    wx.navigateTo({
      url: '/pages/paidcard/paidcard',
    })
  },
  integral: function () {
    var integral = this.data.userinfo.integral
    //console.log(integral)
      wx.navigateTo({
        url: '/pages/integrallist/integrallist?integral=' + integral,
      })
  },
  balance: function () {
    var money = this.data.userinfo.money
    wx.navigateTo({
      url: '/pages/balancelist/balancelist?money=' + money,
    })
  },
  information: function () {
    wx.navigateTo({
      url: '/pages/myinformation/myinformation',
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    var that = this
    return {
      title: '',
      success(res) {
        console.log(res.shareTickets[0])
      }
    }
  }
})
 