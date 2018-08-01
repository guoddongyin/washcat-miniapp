// pages/myinformation/myinformation.js
var util = require('../../utils/util.js')
Page({
  data: {
    date: '2018-02-12',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    userinfo:'',
    portrait: '',//头像
  },

  onLoad: function () {
    //this.requestdata();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.requestdata();
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
        portrait: res.data.data.avatar.slice(42)
      })
    })
  },
  bindphone:function(){
    wx.navigateTo({
      url: '/pages/bindphone/bindphone',
    })
  },
  invoicemanage: function () {
    wx.navigateTo({
      url: '/pages/invoicemanage/invoicemanage',
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
    console.log('datePickerOnSureClick');
    console.log(e);
    this.setData({
      date: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },
})
