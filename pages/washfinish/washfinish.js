// pages/washfinish/washfinish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    player()
    function player() {
      backgroundAudioManager.title = '此时此刻'
      backgroundAudioManager.src = 'https://www.catcarwasher.com/washcar-admin/wx/jieshu.mp3'
    }
  
  },
  evaluation:function(){
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