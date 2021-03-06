// pages/numberdetail/numberdetail.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    date: '',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    getnumberlist: {},
    carid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var carid = options.carid
    this.setData({
      carid: carid
    })
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
      time: that.data.date,
      userCardId: that.data.carid
    }
    console.log("参数", data);
    util.request_data("userCardNumsDetails/getUserCardNumsDetails", 'POST', data, function (res) {
      console.log(res)
      var getnumberlist = res.data.data.list
      for (var i = 0; i < getnumberlist.length;i++){
        getnumberlist[i].createTime = util.DateHelper(getnumberlist[i].createTime, 'yyyy-MM-dd HH:mm')
      }
      that.setData({
        getnumberlist: getnumberlist,
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
    var that = this
    return {
      title: '',
      success(res) {
        console.log(res.shareTickets[0])
      }
    }
  },

})