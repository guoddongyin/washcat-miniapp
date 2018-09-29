// pages/mycard/mycard.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carddata:'', //获取猫卡数量
    selectIndex: '0',
    cardnum:0, //转赠猫卡数量
    maxcarnum: 0,//最大转赠猫卡数量
    cardId:'',
    currentid:'',
    cardnumdata:'',
    showModalStatus: false,
    showfxStatus:false,
    currentStatu:'',
    status:true,
    unixtime:'',
    sign:''
    //activeIndex: '',//默认选中第一个
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestdata();
    //this.savecard()
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
    // console.log("anshu",data)
    util.request_data("userCard/getUserCard", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        carddata: res.data.data
      })
    })
  },
  //选择猫卡
  choosecard: function (e) {
    console.log(e)
    var that = this;
    var index = e.currentTarget.dataset.id;
    console.log(index)
    this.setData({
      currentid: index
    })
  },

  //减猫卡数量
  numberSub : function(e) {
    var that = this;
    if (that.data.cardnum == 0) {
      wx.showToast({
        title: '已达到最小转赠值',
        icon: 'none'
      })
    } else {
      this.data.cardnum--;
      this.setData({
        cardnum: this.data.cardnum,
      })
    }
  },
  //加猫卡数量
  numberAdd:function(e) {
    var that = this;
    console.log(666)
    if (that.data.cardnum==that.data.maxcarnum){
      wx.showToast({
        title: '已达到最大转赠值',
        icon:'none'
      })
   }else{
      this.data.cardnum++;
      this.setData({
        cardnum: this.data.cardnum,
      })
   }
  },

  //弹出框
  powerDrawer: function (e) {
    var that=this
    var currentid
    var id = e.currentTarget.dataset.id
    var currentStatu = e.currentTarget.dataset.statu;
    var cardnum
    console.log(id)
    // 弹出遮罩层
    if (id != undefined){
      currentid =  e.currentTarget.dataset.id;
      that.data.currentid = currentid
      cardnum = 0
      that.setData({
        cardnum:cardnum,
      })
    }else{
      currentid = that.data.currentid
      // cardnum: that.data.cardnum
    }
    that.util(currentStatu)
    console.log(currentid)
    console.log(that.data.carddata[currentid].nums)
    var maxnum = that.data.carddata[currentid].nums
    var cardId = that.data.carddata[currentid].id
    that.setData({
      maxcarnum: maxnum,
      cardId: cardId,
      cardnum: that.data.cardnum,
      currentStatu: currentStatu,
    })
  },

  //提交转赠次数
  formcardnum : function () {
    var that = this;
    var data = {
      formOpenid: wx.getStorageSync('openid'),
      cardId: that.data.cardId,
      nums: that.data.cardnum
    }
    console.log("anshu", data)
    util.request_data("userCardNumsShare/shareCardUrl", 'POST', data, function (res) {
      console.log(res)
      console.log(2)
      var cardnumdata = res.data.data
      that.setData({
        cardnumdata: cardnumdata
      })
      success: {
        var data = {
          formOpenid: wx.getStorageSync('openid'),
          cardId: that.data.cardId,
          nums: that.data.cardnum,
          unixtime: that.data.cardnumdata.unixtime,
          sign: that.data.cardnumdata.sign
        }
        console.log("canshu", data)
        util.request_data("userCardNumsShare/saveCardNumsShare", 'POST', data, function (res) {
          console.log(res)
        })
      }
    })
     if (that.data.cardnum==0){
      wx.showToast({
        title: '请选择转赠次数',
        icon:'none'
      })
       that.setData({
         showfxStatus: false
       })
    }
    // else{
    //   that.setData({
    //     showfxStatus: true
    //   })
    // } 
  },
  util: function (currentStatu) {
    /* 动画部分 */  
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    }); 
    this.animation = animation;
    animation.opacity(0).rotateX(-100).step(); 
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () { 
      animation.opacity(1).rotateX(0).step();  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            // showfxStatus: false
          }
        );
      } 
      else if (currentStatu == "open"){
        this.setData(
          {
            showfxStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true,
          // showfxStatus: true
        }
      );
    }
     else if (currentStatu == "close"){
      this.setData(
        {
          showfxStatus: true
        }
      );
    }
  },
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function (e) {
    var that = this
    that.setData({
      showfxStatus: false
    })
      console.log(1)
    var sign = that.data.cardnumdata.sign
    console.log(that.data.cardnumdata)
    console.log(sign)
    var unixtime = that.data.cardnumdata.unixtime
    var nums = that.data.cardnum
    var openid = wx.getStorageSync('openid')
    var path = '/pages/mycardlq/mycardlq?nums=' + nums + '&sign=' + sign + '&unixtime=' + unixtime + '&openid=' + openid;
    return {
      title: '猫卡转赠',
      path: path
    }
    success: {
      wx.showToast({
        title: '转赠成功',
        icon: 'none'
      })
    }
  },

  paidcard: function (e) {
    var that = this
    var position = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/paidcard/paidcard',
    })
  },
  cardexchange: function () {
    wx.navigateTo({
      url: '/pages/cardexchange/cardexchange',
    })
  },
  carddetail: function (e) {
    console.log(e)
    var currentid = e.currentTarget.dataset.index
      var cardId = this.data.carddata[currentid].id
    var status = this.data.status
    console.log(cardId)
    wx.navigateTo({
      url: '/pages/carddetail/carddetail?status=' + status + '&cardId=' + cardId,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.requestdata();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.requestdata();
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

 
})