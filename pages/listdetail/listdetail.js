// pages/listdetail/listdetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',//订单id
    orderlistdata:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId
    this.data.orderId = orderId
    this.getorderdata()
  },
  //获取订单详情信息
  getorderdata:function(){
    var that = this;
    var data = {
      orderId: that.data.orderId,
      userId: wx.getStorageSync('IDID'),
    }
    console.log(data)
    util.request_data("washcarOrder/getOrderDetails", 'POST', data, function (res) {
      console.log(res)
      var orderlistdata = res.data.data
      // for (var i = 0; i < orderlistdata.length; i++) {
        orderlistdata.createTime = util.DateHelper(orderlistdata.createTime, 'yyyy-MM-dd HH：mm')
      // }
      that.setData({
        orderlistdata: orderlistdata,
      })
    })
  },
  //去评价
  // evaluation: function (e) {
  //   //console.log(e)
  //   var that = this
  //   var position = e.currentTarget.dataset.id
  //   var orderId = that.data.orderlistdata[position].id
  //   wx.setStorageSync('orderId', orderId)
  //   wx.navigateTo({
  //     url: '/pages/evaluation/evaluation',
  //   })
  // },
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
  }
})