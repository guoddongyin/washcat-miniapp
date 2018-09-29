// pages/mycardlq/mycardlq.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carddata: '', //获取猫卡信息
    nums:'',
    sign:'',
    openid:'',
    status:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (wx.getStorageSync('openid') == null || wx.getStorageSync('openid') == '') {
    //   wx.navigateTo({
    //     url: '/pages/authorization/authorization',
    //   })
    // } 
    console.log(options)
    var nums = options.nums
    var sign = options.sign
    console.log(sign)
    var openid = options.openid
    this.data.nums = nums
    this.data.sign = sign
    this.data.openid = openid
    this.setData({
      nums:nums,
      sign: sign,
      openid:openid
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
    this.requestdata();
  },
  requestdata: function () {
    var that = this
    var data = {
      userId: wx.getStorageSync('IDID')
    }
    // console.log("anshu",data)
    util.request_data("userCard/getUserCard", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        carddata: res.data.data
      })
    })
  },
  //领取
  queding:function (){
    var that = this
    var data = {
      formOpenid:that.data.openid,
      toOpenid: wx.getStorageSync('openid'),
      sign:that.data.sign
    }
     console.log("anshu",data)
    util.request_data("userCardNumsShare/getCardNumsShare", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        status:false
      })
    })
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