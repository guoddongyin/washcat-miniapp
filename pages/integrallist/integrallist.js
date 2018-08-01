var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    date: '2018-07-27',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    integrallist: '',
  },

  onLoad: function () {
    this.gitintegral();
  },
  //显示时间选择器
  showDatePicker: function (e) {
    this.setData({
      datePickerIsShow: true,
    });
  },
  datePickerOnSureClick: function (e) {
    var that=this
    console.log('datePickerOnSureClick');
    console.log(e);
    that.setData({
      date: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
    console.log(that.data.date)
    var data = {
      userId: wx.getStorageSync('IDID'),
      pageNo: 1,
      pageSize: 20,
      time: that.data.date
    }
    console.log("参数", data);
    util.request_data("userIntegral/getUserIntegral", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        integrallist: res.data.data.list,
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
//获取积分记录
gitintegral:function(){
var that = this;
  var data = {
    userId: wx.getStorageSync('IDID'),
    pageNo:1,
    pageSize:20,
    time: that.data.date
  }
  console.log("参数", data);
  util.request_data("userIntegral/getUserIntegral", 'POST', data, function (res) {
    console.log(res)
    that.setData({
      integrallist: res.data.data.list,
    })
  })
}

})