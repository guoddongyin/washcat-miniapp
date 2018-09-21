// pages/mylist/mylist.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["全部", "待退款", "待评价"],
    currentNavtab: "0",
    orderlistdata:'',//全部订单
    gettuikuandata:'',//待退款订单
    getpingjdata: '',//待评价订单
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getorderlist();
    this.gettuikuan();
  },
  //切换tab
  switchTab: function (e) {
    var that = this;
    console.log(e)
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    if (that.data.currentNavtab==0) {
      that.getorderlist();
    } else if (that.data.currentNavtab == 1) {
      console.log(),
      that.gettuikuan();
    }else{
      
      that.getpingjia()
    }
  },
  //获取订单列表数据
  getorderlist : function (){
    var that = this;
    var data = {
      pageNo:1,
      pageSize:99,
      userId:wx.getStorageSync('IDID'),
    }
    util.request_data("washcarOrder/getOrderUser", 'POST', data, function (res) {
      console.log(res)
      var orderlistdata = res.data.data.list;
      for (var i = 0; i < orderlistdata.length; i++) {
        orderlistdata[i].createTime = util.DateHelper(orderlistdata[i].createTime, 'yyyy-MM-dd HH:mm')
      }
      that.setData({
        orderlistdata: orderlistdata
      })
    })
  },
  //获取待退款
  gettuikuan : function (){
    var that = this;
    // if (that.currentNavtab==1) { 
      var data = {
        pageNo: 1,
        pageSize: 99,
        userId: wx.getStorageSync('IDID'),
        // evaluateStatus:0,
        isOpen: 0
      }
      util.request_data("washcarOrder/getOrderUser", 'POST', data, function (res) {
        console.log(res)
        var gettuikuandata = res.data.data.list;
        for (var i = 0; i < gettuikuandata.length; i++) {
          gettuikuandata[i].createTime = util.DateHelper(gettuikuandata[i].createTime, 'yyyy-MM-dd HH:mm')
        }
        that.setData({
          gettuikuandata: gettuikuandata
        })
      })
    // }
  },
  //申请退款
  tuikuan:function(e){
    var that = this;
    var position = e.currentTarget.dataset.id
    var orderId = that.data.gettuikuandata[position].id
    console.log(orderId)
    wx.showModal({
      title: '确定申请退款',
      content: '',
      confirmColor: '#64c4c7',
      success: function (res) {
        var data = {
          userId: wx.getStorageSync('IDID'),
          orderId: orderId
        }
        util.request_data("washcarOrder/refundOrder", 'POST', data, function (res) {
          console.log(res)
          wx.showToast({
            title: '退款成功',
            icon:'none'
          })
        })
        that.gettuikuan()
      } 
    })
  },
  //获取待评价
  getpingjia: function () {
    var that = this;
    // if (that.currentNavtab == 1) {
      var data = {
        pageNo: 1,
        pageSize: 99,
        userId: wx.getStorageSync('IDID'),
        evaluateStatus:0,
        //isOpen: 0
      }
      util.request_data("washcarOrder/getOrderUser", 'POST', data, function (res) {
        console.log(res)
        var getpingjdata = res.data.data.list;
        for (var i = 0; i < getpingjdata.length; i++) {
          getpingjdata[i].createTime = util.DateHelper(getpingjdata[i].createTime, 'yyyy-MM-dd HH:mm')
        }
        that.setData({
          getpingjdata: getpingjdata
        })
      })
    // }
  },
 //订单详情
  listdetail:function(e){
    //console.log(e)
    var that = this
    var position = e.currentTarget.dataset.id
    var orderId = that.data.orderlistdata[position].id
    wx.navigateTo({
      url: '/pages/listdetail/listdetail?orderId=' + orderId,
    })
  },
  //去评价
  evaluation: function (e) {
    //console.log(e)
    var that = this
    var position = e.currentTarget.dataset.id
    if (that.data.currentNavtab == 0){
      var orderId = that.data.orderlistdata[position].id
    } else if (that.data.currentNavtab == 2){
      var orderId = that.data.getpingjdata[position].id
    }
    wx.setStorageSync('orderId', orderId)
    wx.navigateTo({
      url: '/pages/evaluation/evaluation',
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
    this.getorderlist();
    this.gettuikuan();
    this.getpingjia();
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