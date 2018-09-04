// pages/choosecity/choosecity.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1,2,3],
    //inputkey: '',
    cityname: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cityname = wx.getStorageSync('cityname')

    this.setData({
      cityname: cityname
    })

    this.getCitydata()
  },

  getCitydata: function () {
    var that = this
    var data = {
      pageNo: 1,
      pageSize: 999,
      // city: that.data.cityname
    }

    util.request_data("washcardevStatus/getDevCity", 'POST', data, function (res) {
      console.log(res)
      var botlist = res.data.data.list;

      that.setData({
        list: botlist,
      })

    })
  },

  choosecity: function (e) {
    console.log(e)
    var cityname = e.currentTarget.dataset.id.city
    wx.setStorageSync("cityname2", cityname)
    wx.navigateBack({
      delta: 1,
    })
  },
  getcity:function () {
    var cityname = this.data.cityname
    wx.setStorageSync("cityname2", cityname)
    wx.navigateBack({
      delta: 1,
    })
  },
  //输入的关键字
  // inputkey: function (e) {
  //   var inputkey = e.detail.value
  //   this.data.inputkey = inputkey
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

  }
})