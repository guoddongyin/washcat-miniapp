var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    date: '',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false, 
    integrallist: '', //积分列表
    integral:'',//总积分
    pageNo: 1, //当前页数
    pageSize: 10,//每页显示条数
    numtotal:0,//总条数
  },

  onLoad: function (options) {
    var integral = options.integral
    this.data.integral = integral
    this.setData({
      integral: integral
    })
    //console.log(integral)
    this.gitintegral();
  },
  //显示时间选择器
  showDatePicker: function (e) {
    this.setData({
      datePickerIsShow: true,
    });
  },
  //时间选择器确定按钮
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
    that.gitintegral()
  },
  //时间选择器取消按钮
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
    pageNo:that.data.pageNo,
    pageSize:that.data.pageSize,
    time: that.data.date
  }
  console.log("参数", data);
  util.request_data("userIntegral/getUserIntegral", 'POST', data, function (res) {
    console.log(res)
    var integrallist = res.data.data.list
    var numtotal = res.data.data.total
    for (var i = 0; i < integrallist.length;i++){
      integrallist[i].createTime = util.DateHelper(integrallist[i].createTime, 'yyyy-MM-dd')
    }
    if (that.data.pageNo == 1) {
      that.setData({
        integrallist: integrallist,
        numtotal: numtotal
      })
    } else {
      var new_page_cont = that.data.integrallist;
      var current_guide_list = res.data.data.list;
      for (var i = 0; i < current_guide_list.length; i++) {
        new_page_cont.push(current_guide_list[i])
      }
      that.setData({
        integrallist: new_page_cont,
      })
    }
  })
},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(e) {
    var that = this;
    var pageNo = null;
    pageNo = that.data.pageNo + 1;
    console.log(pageNo)
    that.setData({
      pageNo: pageNo
    })
    if (that.data.numtotal > that.data.integrallist.length) {
      wx.showToast({
        title: '加载中！',
        icon: 'loading',
        duration: 1000
      })
       that.gitintegral();
    } else{
      wx.showToast({
        title: '数据已加载完',
        icon: 'loading',
        duration: 1000
      });
      return;
    }
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