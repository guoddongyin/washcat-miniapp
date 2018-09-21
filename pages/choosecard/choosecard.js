// pages/choosecard/choosecard.js
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carddata: '',
    activeIndex: '',//默认选中第一个
    devId:'',//设备id
    cardid:'',//猫卡id
    nums:'',
    status:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var devId = options.devId
    this.data.devId = devId
    this.requestdata();
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {

  },
  //获取猫卡信息
  requestdata: function () {
    var that = this
    var data = {
      userId: wx.getStorageSync('IDID')
    }
    console.log("anshu", data)
    util.request_data("userCard/getUserCard", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        carddata: res.data.data,
      })
    })
  },
  //选择猫卡
  choosecard:function (e) {
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.id;
    var cardid = that.data.carddata[index].id
    var nums = that.data.carddata[index].nums
    console.log(nums)
    this.setData({
      activeIndex: index,
      cardid: cardid,
      nums:nums
    })
  },
  //立即支付
  paynow:function(){
    var that = this;
    var id = that.data.devId
    //console.log(that.data.carddata.length)
    if (that.data.cardid==''){
      wx.showToast({
        title: '请选择猫卡',
        icon:'none'
      })
    }else{
      wx.showModal({
        title: '确定使用此卡支付',
        // content: '确定使用此卡支付',
        confirmColor: '#1b3165',
        success: function (res) {
          if (res.confirm) {
            var data = {
              openId: wx.getStorageSync('openid'),
              devId: that.data.devId,
              cardId: that.data.cardid,
              orderSource: 1
            }
            console.log(data)
            util.request_data("pay/unifiedVoucher", 'POST', data, function (res) {
              console.log(res)
              var paydata = res.data.data;
              wx.navigateTo({
                url: '/pages/paysucesscard/paysucesscard?devId=' + id + '&nums=' + that.data.nums + '&status=' + that.data.status,
              })
            })
            that.requestdata();
          } else if (res.cancel) {
            that.requestdata();
          }
        }

      })
    }
 
    
  },

  //跳转到猫卡详情
  carddetail: function (e) {
    var that = this
    var position = e.currentTarget.dataset.id
    var cardid = that.data.carddata[position].id
    wx.navigateTo({
      url: '/pages/carddetail/carddetail?cardid=' + cardid,
    })
  },
  paidcard: function () {
    wx.navigateTo({
      url: '/pages/paidcard/paidcard',
    })
  },
  cardexchange: function () {
    wx.navigateTo({
      url: '/pages/cardexchange/cardexchange',
    })
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
  }
})