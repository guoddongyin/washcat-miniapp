// pages/carwashing/carwashing.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress_txt: '正在洗车中...', 
   // count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    stationlist: '',
    devId: '',
    time:'',
    getWashcarcmdStatus:'',
    Interval:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var devId = options.devId
    that.data.devId = devId
    var time = options.time
    that.data.time = time
    console.log(time)
    that.setData({
      time:time
    })
    that.getstationdata()
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.src = 'https://www.catcarwasher.com/washcar-admin/wx/washcar.mp3' // 设置了 src 之后会自动播放
    //that.countInterval()
  },
  //获取支付信息
  getstationdata: function (e) {
    var that = this
    var data = {
      devId: that.data.devId
    }
    util.request_data("washcardevStatus/getDev", 'POST', data, function (res) {
      console.log(res)
      var stationlist = res.data.data
      that.setData({
        stationlist: stationlist,
      })
    })
  },
     
  //获取洗车状态信息
  getWashcarcmdStatus : function () {
    var that = this
    var data = {
      devId: that.data.devId
    }
    util.request_data("washCarcmd/getWashcarcmdStatus", 'POST', data, function (res) {
      console.log(res)
      var getWashcarcmdStatus = res.data.data
      that.setData({
        getWashcarcmdStatus: getWashcarcmdStatus
      })
    })
  },
  // 设置倒计时 定时器 每10000毫秒执行一次
  countInterval: function () {
    var that = this
    var Interval = setInterval(function(){
      that.getWashcarcmdStatus()
      if (that.data.getWashcarcmdStatus == 3) {
        that.setData({
          progress_txt: "洗车完成"
        });
        wx.navigateTo({
          url: '/pages/washfinish/washfinish',
        })
        clearInterval(Interval);
      } else if (that.data.getWashcarcmdStatus == 0){
        that.setData({
          progress_txt: "等待洗车"
        });
        //clearInterval(Interval);
      } else if (that.data.getWashcarcmdStatus == 1) {
        that.setData({
          progress_txt: "发送命令"
        });
        //clearInterval(Interval);
      } else if (that.data.getWashcarcmdStatus == 2) {
        that.setData({
          progress_txt: "正在洗车中..."
        });
        //clearInterval(that.data.Interval);
      } else if (that.data.getWashcarcmdStatus > 3) {
        wx.showToast({
          title: '洗车异常',
          icon: 'none'
        })
        clearInterval(Interval);
      }
    }, 10000)
    //clearInterval(Interval);
  },
  onReady: function () {
    //this.drawProgressbg();
    //this.drawCircle(1.5) 
    this.countInterval()
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
  
  // },

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