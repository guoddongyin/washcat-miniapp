// pages/orderinfo/orderinfo.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isxuan: false,
    show: false,
    storageTypesId: '',
    storageId: '',
    datadetail: '',
    price: '',//日单价
    tiji: '',//体积
    doorcardnum: 1,//门禁卡数量
    timelist: [],
    listss: '',//
    monthprice: '',//每月价格
    monthnum: '',//月数
    monthid: '',//月数id
    moneyDoor: '',//门卡单价
    totalmoney: '',//总金额
    moneyDeposit: '', //押金
    remark: '',//备注
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.storageId = options.storageId
    this.data.storageTypesId = options.storageTypesId
    //获取可租时间
    this.requesttime()
    //获取仓型详情
    this.requestcangdetail()
  },

  //获取仓型详情
  requestcangdetail: function () {
    var that = this
    var data = {
      storageId: that.data.storageId,
      storageTypesId: that.data.storageTypesId
    }
    // console.log('大大大所多')
    util.request_data("storageCell/getStorageCell", 'POST', data, function (res) {
      console.log(res)
      var data = res.data.data
      var price = (data.money / 30).toFixed(2)
      var tiji = (data.height * data.lengths * data.width).toFixed(2)
      that.setData({
        datadetail: data,
        price: price,
        monthprice: data.money,
        tiji: tiji,
        moneyDoor: data.moneyDoor,
        moneyDeposit: data.moneyDeposit
      })

      that.calculatemoney()
    })
  },

  //减
  jian: function () {
    var that = this
    var nownum = that.data.doorcardnum
    if (nownum == 1) {
      wx.showToast({
        title: '不能低于1',
        icon: 'none',
      })
    } else {
      nownum = nownum - 1
      that.setData({
        doorcardnum: nownum
      })
      //计算总金额
      that.calculatemoney()
    }
  },

  //加
  jia: function () {
    var that = this
    var nownum = that.data.doorcardnum
    if (nownum == 100) {
      wx.showToast({
        title: '不能高于100',
        icon: 'none',
      })
    } else {
      nownum = nownum + 1
      that.setData({
        doorcardnum: nownum
      })
      //计算总金额
      that.calculatemoney()
    }
  },

  //计算总金额
  calculatemoney: function () {
    var that = this
    var totalmoney = ''
    var monthnum = that.data.monthnum
    var monthprice = that.data.monthprice
    var doorcardnum = that.data.doorcardnum
    var moneyDoor = that.data.moneyDoor
    var moneyDeposit = that.data.moneyDeposit
    if (monthnum == '' || monthprice == '' || doorcardnum == '' || moneyDoor == '') {
      totalmoney = 0
    } else {
      totalmoney = (monthnum * monthprice + doorcardnum * moneyDoor + moneyDeposit).toFixed(2)
    }

    that.setData({
      totalmoney: totalmoney
    })
  },

  //获取可租时长
  requesttime: function () {
    var that = this
    // console.log('大大大所多')
    util.request_data("availableTime/getAvailableTimeList", 'POST', '', function (res) {
      console.log(res)
      var list = res.data.data
      var listtime = []
      for (var i = 0; i < list.length; i++) {
        listtime.push(list[i].month)
      }
      that.setData({
        timelist: listtime,
        listss: list,
        monthnum: list[0].month,
        monthid: list[0].id
      })
      //计算总金额
      that.calculatemoney()
    })
  },

  //选择可租时长
  bindPickerChange: function (e) {
    console.log(e)
    var position = e.detail.value
    var that = this
    var monthnum = that.data.listss[position].month
    var monthid = that.data.listss[position].id

    that.setData({
      monthnum: monthnum,
      monthid: monthid
    })

    //计算总金额
    that.calculatemoney()
  },


  //备注信息
  beizhu: function (e) {
    this.data.remark = e.detail.value
  },

  //是否阅读协议
  choosexieyi: function () {
    var that = this
    if (that.data.isxuan) {
      that.data.isxuan = false
    } else {
      that.data.isxuan = true
    }

    that.setData({
      isxuan: that.data.isxuan
    })
  },

  //协议
  xieyi: function () {
    wx.navigateTo({
      url: '../../pages/xieyi/xieyi?types=1',
    })
  },

  clickhidden: function () {
    this.setData({
      show: false,
    })
  },

  //确认订单
  sureorder: function () {
    var that = this

    if (that.data.isxuan) {
      var data = {
        userId: wx.getStorageSync("IDID"),
        storageId: that.data.storageId,
        storageTypesId: that.data.storageTypesId,
        doorNums: that.data.doorcardnum,
        month: that.data.monthnum,
        remarks: that.data.remark
      }

      util.request_data("order/saveOrder", 'POST', data, function (res) {
        console.log(res)
        var orderId = res.data.data.orderId
        that.requestpay(orderId)
      })
    } else {
      wx.showToast({
        title: '是否阅读用户协议',
        icon: 'none'
      })
    }
  },

  requestpay: function (orderId) {
    var that = this
    var data = {
      openId: wx.getStorageSync("openid"),
      orderId: orderId
    }

    util.request_data("pay/payPrepay", 'POST', data, function (res) {
      console.log(res)
      var data = res.data.data
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: function (res) {
          console.log('成功')
          wx.showToast({
            title: '支付成功',
            icon: 'none',
            duration: 1500
          })
          // console.log('成功')
          wx.navigateTo({
            url: '../../pages/success/success?ordersn=' + that.data.ordersn + '&isfree=' + 0,
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