// pages/attention/attention.js
var util = require('../../utils/util.js');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    devId: '',
    helplist: '',
    content: '',
    backgroundAudioManager:''
  },
  paidnow:function () {
    var that = this;
    var id = that.data.devId
    var data = {
      devId: that.data.devId
    }
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.stop()
    util.request_data("washCarcmd/getWashcarcmd", 'POST', data, function (res) {
      console.log(res)
      wx.navigateTo({
        url: '/pages/paynow/paynow?devId=' + id,
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var devId = options.devId
    this.data.devId = devId
    this.gethelpList();
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    player()
    function player() {
      backgroundAudioManager.title = '此时此刻'
      backgroundAudioManager.src = 'https://www.catcarwasher.com/washcar-admin/wx/becareful.mp3'
    }
  
  },
  //获取帮助信息
  gethelpList: function () {
    var that = this;
    var data = {
      types: 3
    }
    util.request_data('imagetext/getImagetext', 'post', data, function (res) {
      console.log(res);
      var helplist = res.data.data
      var content = helplist.content
      if (content) {
        content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
      }
      that.setData({
        helplist: helplist,
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
    wx.stopBackgroundAudio()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopBackgroundAudio()
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