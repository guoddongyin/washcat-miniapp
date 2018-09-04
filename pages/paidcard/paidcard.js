// pages/paidcard/paidcard.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: '',//默认选中第一个
    moneyArray: '',
    cardid:'',
    numarray:'',//
    money:''
  },
 //获取次卡信息
  getmoneyArray:function () {
    var that = this;
    var data = {}
    util.request_data("washcarCard/getWashcarCard", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        moneyArray: res.data.data,
      })
    })
  },
  //点击充值金额
  activethis: function (e) {
    console.log(e)
    var that = this;
    var thisindex = e.currentTarget.dataset.thisindex;//当前index
    var id = that.data.moneyArray[thisindex].id
    this.setData({
      activeIndex: thisindex
    })
    var data = {
      openId: wx.getStorageSync('openid'),
      cardId: id,
      payType:1,
      //nums:2
    }
    util.request_data("pay/unifiedCard", 'POST', data, function (res) {
      console.log(res)
      var paydata = res.data.data;
      wx.requestPayment({
        timeStamp: paydata.timeStamp,
        nonceStr: paydata.nonceStr,
        package: paydata.package,
        signType: paydata.signType,                                                            
        paySign: paydata.paySign,
        success: function (res) {
          console.log('成功')
          wx.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 1500
          })
          // console.log('成功')
          wx.navigateTo({
            url: '/pages/carddetail/carddetail',
          })
        },
        fail: function (res) {
          // console.log('失败')
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    })
  },
  //获取自定义次数的充值金额
  nums2: function (e) {
    var that = this;
    that.setData({
      money: ''
    })
    console.log(e)   
    var money = ''
    var num=e.detail.value
    var mumarr = that.data.numarray
    console.log(mumarr)
    var list=[]
    for (var i = 0; i < mumarr.length;i++){
      var num1 = mumarr[i].nums[0];
      var num2 = mumarr[i].nums[1];
      if (parseInt(num2) > parseInt(num)){
        list.push(i)
      }
    }
    console.log(list);

    var money1 = mumarr[list[0]].money
    var money='(￥'+money1*num+')'
    console.log(money1)
    that.setData({
      money:money
    })
  },
  //获取自定义次卡充值金额
  getmoney:function(){
    var that = this
    var data={}
    util.request_data("washcarCard/getWashcarCardNums", 'POST', data, function (res) {
      console.log(res)
      var numarray = res.data.data
      for (var i = 0; i < numarray.length;i++){
        numarray[i].nums=numarray[i].nums.split('#')
      }
      that.setData({
        numarray: numarray
      })
      console.log(that.data.numarray)
    })
  },
  //自定义充值金额
  paymyself: function (e) {
    var that = this;
    var nums2 = e.detail.value.nums2;
    if (nums2.length == 0 || nums2.length == null) {
      wx.showToast({
        title: '请输入自定义充值金额',
        icon:'none'
      })
    }else{
      var data = {
        openId: wx.getStorageSync('openid'),
        payType: 2,
        nums: nums2
      }
      console.log(data + "参数")
      util.request_data("pay/unifiedCard", 'POST', data, function (res) {
        console.log(res)
        var paydata = res.data.data;
        wx.requestPayment({
          timeStamp: paydata.timeStamp,
          nonceStr: paydata.nonceStr,
          package: paydata.package,
          signType: paydata.signType,
          paySign: paydata.paySign,
          success: function (res) {
            console.log('成功')
            wx.showToast({
              title: '支付成功',
              icon: 'none',
              duration: 1500
            })
            // console.log('成功')
            wx.navigateBack({
              url: '/pages/mycard/mycard',
            })
          },
          fail: function (res) {
            // console.log('失败')
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 1500
            })
          }
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cardid = options.cardid
    this.data.cardid = cardid
    this.getmoneyArray();
    this.getmoney()
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