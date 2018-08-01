// pages/numberdetail/numberdetail.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    date: '2018-07-27',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    getnumberlist: {},
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnumber()
  },

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
    this.setData({
      date: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
    var data = {
      userId: wx.getStorageSync('IDID'),
      pageNo: 1,
      pageSize: 20,
      time: that.data.data
    }
    console.log("参数", data);
    util.request_data("userCardNumsDetails/getUserCardNumsDetails", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        getnumberlist: res.data.data.list,
      })
    })
  },

  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },
  //获取次数明细
  getnumber: function (e) {
    var that = this;
    var data = {
      userId: wx.getStorageSync('IDID'),
      pageNo: 1,
      pageSize: 20,
      time: that.data.date
    }
    console.log("参数", data);
    util.request_data("userCardNumsDetails/getUserCardNumsDetails", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        integrallist: res.data.data.list,
      })
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

  },

})