// pages/carddetail/carddetail.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carddatainfo:'',//，猫卡信息
    carddata:'',
    carid:'',
    status:'',
    showModalStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.cardid
    var status = options.status
    console.log(status)
    that.setData({
      status: status
    })
    that.requestdata();
  },
  requestdata: function () {
    var that = this
    var data = {
      userId: wx.getStorageSync('IDID')
    }

    util.request_data("userCardNums/getUserCardNums", 'POST', data, function (res) {
      console.log(res)
      that.setData({
        carddatainfo: res.data.data
      })
    })
  },
  returnindex:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  //分享
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
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    var that = this
    return {
      title: '页面分享标题',
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
  onShareAppMessage: function (e) {
    var that = this
    return {
      success(res) {
        console.log(res.shareTickets[0])
      }
    }
  },
  numberdetail:function(){
    wx.navigateTo({
      url: '/pages/numberdetail/numberdetail',
    })
  }
})