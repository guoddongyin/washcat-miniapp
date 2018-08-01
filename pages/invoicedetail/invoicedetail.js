// pages/invoicedetail/invoicedetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     invoiceList:''
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getivoicedata();
    var id= options.id;
  },
  getivoicedata:function(){
    var that = this;
    var data = {
      userId: wx.getStorageSync('IDID'),
    }
    util.request_data('userInvoice/getInvoice', 'post', data, function (res) {
      console.log(res);
      var invoiceList = res.data.data
      for (var i = 0; i < invoiceList.length; i++) {
        invoiceList[i].createTime = util.DateHelper(invoiceList[i].createTime, 'yyyy-MM-dd mm:ss')
      }
      that.setData({
        invoiceList: invoiceList
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
  
  }
})