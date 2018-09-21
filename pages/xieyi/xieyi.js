// pages/xieyi/xieyi.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xieyiinfo:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getxieyiinfo()
  },
  getxieyiinfo:function(e){
    var that = this
    var data = {
      types: 1
    }
    util.request_data("imagetext/getImagetext", 'POST', data, function (res) {
      console.log(res)
      var xieyiinfo = res.data.data
      var content = xieyiinfo.content
      if (content) {
        content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
      }
      that.setData({
        xieyiinfo: xieyiinfo,
        content: content
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
  onShareAppMessage: function (e) {
    var that = this
    return {
      // path: '/pages/',
      success(res) {
        console.log(res.shareTickets[0])
      }
    }
  },
})