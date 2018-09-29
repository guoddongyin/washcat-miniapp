// pages/stationdetail/stationdetail.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    devId:'',
    imgurls:'',
    stationlist:'',//站点信息
    reviewlist:'',//评论信息
    total:'',//评论总数
    images:'',//评论图片
    showModalStatus: false,
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var devId = options.devId
    this.data.devId = devId
    this.requestimg()
    this.getstationdata()
    this.getreviewdata()
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    player()
    function player() {
      backgroundAudioManager.title = '此时此刻'
      backgroundAudioManager.src = 'https://www.catcarwasher.com/washcar-admin/wx/stationdel.mp3'
    }
  
  },
  //获取轮播图
  requestimg: function () {
    var that = this
    var data = {
      mediaType:1
    }
    util.request_data("banner/getBanner", 'POST', data, function (res) {
      console.log(res)
      var botlist = res.data.data
      that.setData({
        imgurls: botlist
      })
    })
  },

  //获取站点详情信息
  getstationdata:function (e) {
    var that = this
    var data = {
      devId: that.data.devId
    }
    util.request_data("washcardevStatus/getDev", 'POST', data, function (res) {
      console.log(res)
      var stationlist = res.data.data
      var washPriceSign = stationlist.washPriceSign
      var phone = stationlist.phone
      var washSign = wx.setStorageSync('washPriceSign', washPriceSign)
      that.setData({
        stationlist: stationlist,
        phone: phone
      })
    })
  },
  //点击拨打电话
  callme: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  //获取地理位置
  stationditu:function () {
    wx.navigateTo({
      url: '/pages/stationditu/stationditu',
    })
  },
  shipin:function(){
    var videoUrl = this.data.stationlist.videoUrl
    wx.navigateTo({
      url: '/pages/webview/webview?videoUrl=' + videoUrl,
    })
  },
  //获取评论信息
  getreviewdata:function(){
    var that = this;
    var data = {
      pageNo:1,
      pageSize:99,
      devId:that.data.devId
    }
    util.request_data("washcarEvaluate/getWashcarEvaluate", 'POST', data, function (res) {
      console.log(res)
      var reviewlist = res.data.data.list
      var total = res.data.data.total;
      for (var i = 0; i < reviewlist.length; i++) {
        reviewlist[i].createTime = util.DateHelper(reviewlist[i].createTime, 'MM-dd HH:mm')
        console.log(reviewlist[i].imgUrl)
        var images = reviewlist[i].imgUrl
        if(images==''){

        }else{
          reviewlist[i].imgUrl = JSON.parse(reviewlist[i].imgUrl);
        }
      }
      that.setData({
        reviewlist: reviewlist,
        total:total,
        images: images
      })
      console.log(reviewlist)
    })
  },
  //普通洗车按钮跳转到注意事项
  attention: function () {
    var that = this;
    var id = that.data.devId
    wx.navigateTo({
      url: '/pages/attention/attention?devId=' + id,
    })
  },
  //公益基金
  publicpay : function () {
    var that = this;
    var id = that.data.devId
    wx.navigateTo({
      url: '/pages/paypablic/paypablic?devId=' + id,
    })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true,
        }
      );
    }
  },
  //弹出框
  powerDrawer: function (e) {
    var that = this
    console.log(e)
    var currentid = e.currentTarget.dataset.id;
    that.data.currentid = currentid
    var currentStatu = e.currentTarget.dataset.statu;
    that.util(currentStatu)
    // that.setData({
    //   showfxStatus: true
    // })
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
})