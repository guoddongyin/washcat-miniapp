// pages/myinformation/myinformation.js
var util = require('../../utils/util.js')
Page({
  data: {
    date: '1994-02-01',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    userinfo:'',
    portrait: '',//头像
    birthday:''
  },

  onLoad: function () {
    //this.requestdata();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.requestdata();
    //this.datePickerOnSureClick()
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
  },
  //获取个人信息
  requestdata: function () {
    var that = this
    var data = {
      openId: wx.getStorageSync('openid')
    }
    console.log("参数", data);
    util.request_data("user/getUser", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        userinfo: res.data.data,
        portrait: res.data.data.avatar,
        birthday: res.data.data.birthday
        
      })
      wx.setStorageSync('mobile', that.data.userinfo.mobile)
    })
  },
  bindphone:function(){
    wx.navigateTo({
      url: '/pages/bindphone/bindphone',
    })
  },
  invoicemanage: function () {
    wx.navigateTo({
      url: '/pages/noinvoicemes/noinvoicemes',
    })
  },
  //显示时间选择器
  showDatePicker: function (e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },
  datePickerOnSureClick: function (e) {
    var that = this
    console.log('datePickerOnSureClick');
    console.log(e);
    that.setData({
      date: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
    //修改生日
    var data = {
      openId:wx.getStorageSync('openid'),
      birthday: that.data.date,
      id:wx.getStorageSync('IDID')
    }
    util.request_data("user/updateUser", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        birthday : that.data.datePickerValue
      })
      that.requestdata();
    })
  },

  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },
})
