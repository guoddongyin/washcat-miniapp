var util = require('../../utils/util.js');
Page({
  data: {
    date: '',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    money:'',
    userInfo: {},
    integrallist:''
  },

  onLoad: function (options) {
    var that = this
    var money = options.money
    that.data.money = money
    this.gitintegral()
    this.setData({
      money:money
    })
  },
  //获取余额明细
  gitintegral: function () {
    var that = this;
    var data = {
      userId: wx.getStorageSync('IDID'),
      pageNo: that.data.pageNo,
      pageSize: that.data.pageSize,
      time: that.data.date
    }
    console.log("参数", data);
    util.request_data("userIntegral/getUserIntegral", 'POST', data, function (res) {
      console.log(res)
      var integrallist = res.data.data.list
      var numtotal = res.data.data.total
      for (var i = 0; i < integrallist.length; i++) {
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
      date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
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