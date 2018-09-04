// pages/invoicetype/invoicetype.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    geren:true,
    qiye:false,
    zhenzhi:true,
    zhuanyong:false,
    typename:'1',
    fapiaoname:'1',
  },
  geren:function (){
    if (!this.data.geren){
      this.data.geren=true;
      this.data.typename='1'
      this.data.qiye = false;
    }
    this.setData({
      geren: this.data.geren,
      typename:this.data.typename,
      qiye:this.data.qiye
    })
  },
  qiye : function (){
    if (!this.data.qiye) {
      this.data.geren = false;
      this.data.typename = '2'
      this.data.qiye = true;
    }
    this.setData({
      geren: this.data.geren,
      typename: this.data.typename,
      qiye: this.data.qiye
    })
  },
  putong: function () {
    if (!this.data.zhenzhi) {
      this.data.zhenzhi = true;
      this.data.fapiaoname = '1'
      this.data.zhuanyong = false;
    }
    this.setData({
      zhenzhi: this.data.zhenzhi,
      fapiaoname: this.data.fapiaoname,
      zhuanyong: this.data.zhuanyong
    })
   },
  zhuanyong: function () {
    console.log('dd')
    var that = this;
    if (!that.data.zhuanyong) {
      that.data.zhenzhi = false ;
      that.data.fapiaoname = '2'
      that.data.zhuanyong = true;
    }
    that.setData({
      zhenzhi: that.data.zhenzhi,
      fapiaoname: that.data.fapiaoname,
      zhuanyong: that.data.zhuanyong
    })
   },
   //提交信息
  bindtype:function(e){
    console.log(e)
    var typearray = {
      userId:wx.getStorageSync('IDID'),
      invoiceTypes: this.data.typename,
      name: this.data.fapiaoname,
      bill:1
    }
    var value1 = e.detail.value;
    var data = Object.assign(typearray, value1)
    util.request_data('userInvoice/saveUserInvoice', 'post', data, function (res) {
      console.log(res);
      // var invoiceInfo = res.data.data.list
      // for (var i = 0; i < invoiceInfo.length; i++) {
      //   invoiceInfo[i].createTime = util.DateHelper(invoiceInfo[i].createTime, 'yyyy-MM-dd')
      // }
      // that.setData({
      //   invoiceInfo: invoiceInfo
      // })
      //console.log(res.data.data.list.createTime)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //新添加还是编辑
    if (options.id && options.id != 'undefined') {
      var editid = options.id;
      var olddata = wx.getStorageSync('appdata');
      // console.log('edit'+editid);
      for (var i = 0; i < olddata.length; i++) {
        var thisid = olddata[i][0].id;
        if (thisid == editid) {
          this.setData({
            id: olddata[i][0].id,
            name: olddata[i][0].name,
            code: olddata[i][0].code,
            addrtel: olddata[i][0].addrtel,
            bankinfo: olddata[i][0].bankinfo
          })
        }
      }
    }
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