// pages/buycard/buycard.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qycarddata: '',//卡劵信息
    status:2,
    state: false,
    first_click: false,
    devn:'',
    name:'',
    washNums: '',
    numsmoney: '',
    numsReceive: '',
    nums: '',
    effectiveTime:'',
    devId:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getcardinfo()
  },
  //选择站点信息
  choosesttaion:function(e){
    var that = this
    console.log(e)
    var stationid = e.currentTarget.dataset.index;
    console.log(stationid)
    var devn = that.data.qycarddata[stationid].DevName
    var name = that.data.qycarddata[stationid].name
    var washNums = that.data.qycarddata[stationid].washNums
    var numsmoney = that.data.qycarddata[stationid].money
    var numsReceive = that.data.qycarddata[stationid].numsReceive
    var nums = that.data.qycarddata[stationid].nums
    var effectiveTime = that.data.qycarddata[stationid].effectiveTime
    var devId = that.data.qycarddata[stationid].devId
    var id = that.data.qycarddata[stationid].id
    console.log(devn)
    that.setData({
      devn: devn,
      name:name,
      washNums: washNums,
      numsmoney: numsmoney,
      numsReceive:numsReceive,
      nums:nums,
      effectiveTime: effectiveTime,
      devId: devId,
      id:id,
      state: false
    })
   
  },
  toggle: function () {
    var list_state = this.data.state,
      first_state = this.data.first_click;
    if (!first_state) {
      this.setData({
        first_click: true
      });
    }
    if (list_state) {
      this.setData({
        state: false
      });
    } else {
      this.setData({
        state: true
      });
    }
  },
   //获取姓名输入的值
  name2: function (e) {  
    var that = this;
    that.setData({
      name2: e.detail.value
    })
  },
  //获取卡劵信息
  getcardinfo: function () {
    var that = this
    var data = {
      cardTypes: 2
    }
    util.request_data('washcarCardCoupon/getWashcarCardCoupon', 'POST', data, function (res) {
      console.log(res)
      var qycarddata = res.data.data
      console.log(qycarddata)
      for (var i = 0; i < qycarddata.length;i++){
        qycarddata[i].effectiveTime = util.DateHelper(qycarddata[i].effectiveTime, 'yyyy-MM-dd')
      }
      that.setData({
        qycarddata: qycarddata
      })
    })
  },
  //支付
  formSubmit: function (e) {
    var that = this;
    var name2 = e.detail.value.name2;
    if (name2==''){  
    }else{
      userName: name2
    }
    var data = {
      openId: wx.getStorageSync('openid'),
      devId: that.data.devId,
      couponId: that.data.id,
      cardTypes: 2,
      userName: name2
    }
    util.request_data("pay/unifiedCardCoupon", 'POST', data, function (res) {
      console.log(res)
      // if (res.data.errcode==0){
      //   wx.showToast({
      //     title: '请选择购卡站点',
      //     icon: 'none'
      //   })
      // }else{
        var paydata = res.data.data;
        wx.requestPayment({
          timeStamp: paydata.timeStamp,
          nonceStr: paydata.nonceStr,
          package: paydata.package,
          signType: paydata.signType,
          paySign: paydata.paySign,
          success: function (res) {
            console.log('成功')
            wx.navigateTo({
              url: '/pages/personal/personal',
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
      // }
    })
  },
  stationlist: function () {
    var statu = this.data.status
    wx.navigateTo({
      url: '/pages/stationlist/stationlist?status=' + statu,
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
    var that = this
    return {
      title: '',
      success(res) {
        console.log(res.shareTickets[0])
      }
    }
  }
})