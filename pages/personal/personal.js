// pages/personal/personal.js 
  /**
   * 页面的初始数据
   */
var util = require('../../utils/util.js')
 var app = getApp()
Page({
  integral: function () {
    wx.navigateTo({
      url: '/pages/integrallist/integrallist',
    })
  },
  balance: function () {
    wx.navigateTo({
      url: '/pages/balancelist/balancelist',
    })
  },
  information:function () {
    wx.navigateTo({
      url: '/pages/myinformation/myinformation',
    })
  },
  data: {
    islogin: true,
    isvisible: false,
    userinfo: '',//用户信息
    portrait:'',//头像
    defaultImg: "../../images/icon_moren.png", //默认图片
    //remark: '',//用户留言

    userListInfo: [{
      icon: '../../images/dingdan-icon.png',
      text: '我的猫卡',
      isunread: true,
      url:'/pages/mycard/mycard'
    }, {
      icon: '../../images/ding-icon.png',
      text: '我的订单',
      isunread: false,
      url: '/pages/mylist/mylist'
    }, {
      icon: '../../images/fapiao-icon.png',
      text: '发票管理',
      url: '/pages/invoicemanage/invoicemanage'
    }, {
      icon: '../../images/qiye-icon.png',
      text: '企业用户',
      url: '/pages/enterpriseuser/enterpriseuser'
    }, {
      icon: '../../images/yongfu-icon.png',
      text: '共享用户',
      url: '/pages/shareduser/shareduser'
    }, {
      icon: '../../images/bz-icon.png',
      text: '帮助中心',
      url: '/pages/helpcenter/helpcenter'
    }]
  },

    onLoad: function () {
      //获取个人信息
      this.requestdata();
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
         portrait:res.data.data.avatar.slice(42)
          //portrait: res.data.data.avatar
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
})
 