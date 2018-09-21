// pages/askinvoice/askinvoice.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceInfo: '',
    yuan:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.invoiceInfo();
  },
  //获取发票信息
  invoiceInfo: function () {
    var that = this;
    var data = {
      userId: wx.getStorageSync('IDID'),
      pageNo: 1,
      pageSize: 99
    }
    util.request_data('washcarOrder/getOrderInvoice', 'post', data, function (res) {
      console.log(res);
      var invoiceInfo = res.data.data.list
      for (var i = 0; i < invoiceInfo.length; i++) {
        invoiceInfo[i].createTime = util.DateHelper(invoiceInfo[i].createTime, 'yyyy-MM-dd');
        invoiceInfo[i].status = false;
      }
      that.setData({
        invoiceInfo: invoiceInfo
      })
      //console.log(res.data.data.list.createTime)
    })
  },
  //获取发票详情
  // goinvoicedetail: function (e) {
  //   var that = this
  //   var position = e.currentTarget.dataset.id
  //   var invoiceid = that.data.invoiceInfo[position].id
  //   wx.navigateTo({
  //     url: '/pages/invoicedetail/invoicedetail?id=' + invoiceid,
  //   })
  // },
  //选择发票
  chooseinvoice : function(e){
    var that = this;
    var position = e.currentTarget.dataset.id
    var stat = that.data.invoiceInfo[position].status
    console.log(stat)
    if(stat){
      that.data.invoiceInfo[position].status=false
    }else{
      that.data.invoiceInfo[position].status=true
    }
    //console.log(that.data.invoiceInfo)
    that.setData({
      invoiceInfo: that.data.invoiceInfo
    })
    this.addyuan();
  },
  //全选
  chooseall :function(){
    var invoiceInfo = this.data.invoiceInfo
    for (var i = 0; i < invoiceInfo.length; i++) {
      invoiceInfo[i].status = true;
    }
    this.setData({
      invoiceInfo:invoiceInfo
    })
    this.addyuan();
  },
  //计算总价
  addyuan:function(){
    var invoiceInfo = this.data.invoiceInfo;
    var price = 0
    for (var i = 0; i < invoiceInfo.length; i++) {
      if (invoiceInfo[i].status){
        price+=invoiceInfo[i].payPrice
      }
    }
    this.setData({
      yuan: price
    })
  },
  //索取发票
  paidcard : function (){
    var array = []
    for (var i = 0; i <this.data.invoiceInfo.length; i++) {
      if (this.data.invoiceInfo[i].status) {
        array.push(this.data.invoiceInfo[i])
      }
    }
    wx.setStorageSync('invoidata', array)
    wx.navigateBack()
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
  // askinvoice: function () {
  //   wx.navigateTo({
  //     url: '/pages/askinvoice/askinvoice',
  //   })
  // }
})