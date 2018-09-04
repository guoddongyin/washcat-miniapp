// pages/paysucesscard/paysucesscard.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devId: '',
    timedata:'',
    nums1:'',
    status1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var devId = options.devId
    this.data.devId = devId
     var nums = options.nums
     var status = options.status
    //  this.data.nums1 = nums
    //  this.data.status1 = status
    console.log(status)
    this.setData({
      status1:status,
      nums1:nums
    })
  },
  //开启洗车机
  carwashing: function () {
    var that = this;
    var id = that.data.devId
    console.log(id)
    var data ={
      openId:wx.getStorageSync('openid'),
      userId:wx.getStorageSync('IDID'),
      devId: id
    }
    util.request_data("washCarcmd/openWashcarcmd", 'POST', data, function (res) {
      console.log(res)
      var time1 = util.DateHelper(res.data.data, 'yyyy-MM-dd HH:mm:ss')
      console.log(time1)
      success:{
        wx.navigateTo({
          url: '/pages/carwashing/carwashing?devId=' + that.data.devId + '&time=' + time1,
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
  
  }
})