// pages/invoicemanage/invoicemanage.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceInfo: '',
    isFirst:true
    //data: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('ISFIRST', true)
    this.invoiceInfo();
  },
  //获取发票信息
  invoiceInfo:function(){
    var that = this;
    var data = {
      userId: wx.getStorageSync('IDID'),
      pageNo:1,
      pageSize:99
    }
    util.request_data('invoiceOpening/getInvoiceOpening','post',data,function(res){
      console.log(res);
      var invoiceInfo=res.data.data.list
      for (var i = 0; i < invoiceInfo.length; i++){
        invoiceInfo[i].createTime = util.DateHelper(invoiceInfo[i].createTime, 'yyyy-MM-dd')
      }
      that.setData({
        invoiceInfo: invoiceInfo,
        isFirst:false
      })
     
      wx.setStorageSync('ISFIRST', false)
      //console.log(res.data.data.list.createTime)
    })
  },
  //获取发票详情
  goinvoicedetail:function(e){
    var that = this
    var position = e.currentTarget.dataset.id
    var invoiceid = that.data.invoiceInfo[position].id
    wx.navigateTo({
      url: '/pages/invoicedetail/invoicedetail?id=' + invoiceid ,
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
    var that = this;
    console.log(that.data.isFirst)
    var state=wx.getStorageSync('ISFIRST')
    console.log(state)
    if (!state){
      var list = that.data.invoiceInfo
      console.log('22222')
      console.log(list)
      console.log('33333')
      var choosedata = wx.getStorageSync('invoidata')

      for (var i = 0; i < choosedata.length; i++) {
        var model = {
          createTime: choosedata[i].createTime,
          id: choosedata[i].id,
          status: 0,
          money: choosedata[i].payPrice,
          userId: choosedata[i].userId,
          invoiceId: choosedata[i].invoiceId
        }
        list.push(model)
      }
      that.setData({
        invoiceInfo: list
      })
    }
  },
  //判断是否已选中
  // setStorg: function (arr) {
  //   var appAll = [];
  //   this.setData({
  //     invoiceInfo: arr,
  //   });
  //   for (var i = 0; i < arr.length; i++) {
  //     appAll.push(arr[i]);
  //   }
  //   wx.setStorage({
  //     key: 'invoidata',
  //     data: appAll,
  //     success: function (e) {
  //       //console.log(e, '更新存储完成')
  //     }
  //   })
  // },

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

  askinvoice:function(){
    wx.navigateTo({
      url: '/pages/askinvoice/askinvoice',
    })
    var that = this;
    console.log(that.data.isFirst)
  }
})