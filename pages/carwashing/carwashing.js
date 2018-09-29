// pages/carwashing/carwashing.js
var util = require('../../utils/util.js');
const ctx = wx.createCanvasContext("bgCanvas"); //创建一个全局的canvas绘图上下文
const ctx2 = wx.createCanvasContext("runCanvas");
let mytime = "";
let n = 0;
var w = "";
var h = "";
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    progress_txt: ' ', 
    score: 100, //传入的进度， 0~100，绘制到此参数处停止。
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
  //倒计时
  run(e) {
    let that = this;
    let src = that.data.src; //每个间隔所需绘制的弧度
    let allSrc = that.data.allSrc; //总共需要绘制的弧度
    n++;
    if (src * n > allSrc) {
      clearInterval(mytime); //如果绘制完成，停掉计时器，绘制结束
      n = 0;
      return;
    }

    let grade = Math.round(src * n / 1.5 * 100); //百分数
    ctx2.arc(w, h, w - 8, 0.75 * Math.PI, (0.75 + src * n) * Math.PI); //每个间隔绘制的弧度
    ctx2.setStrokeStyle("#1c3368");//设置填充线条颜色
    ctx2.setLineWidth("15"); //设置线条宽度
    ctx2.setLineCap("round");     //设置线条端点样式
    ctx2.stroke();//对路径进行描边，也就是绘制线条。
    ctx2.beginPath();
    ctx2.setFontSize(40); //注意不要加引号
    ctx2.setFillStyle("#333333");
    ctx2.setTextAlign("center");
    ctx2.setTextBaseline("middle");
    ctx2.fillText(grade + "s", w, h);
    ctx2.draw();
  },
  canvasTap() {
    let that = this;
    clearInterval(mytime);
    mytime = setInterval(that.run, 3000)
  },


  onLoad: function (options) {
    console.log(options)

    let that = this;
    let allSrc = 0.015 * that.data.score; //应该绘制的弧度
    let src = allSrc / 100 //计算出每个间隔应该绘制多少弧度。 
    that.setData({
      src: src,
      allSrc: allSrc
    })
    this.canvasTap();

    //var that = this
    var devId = options.devId
    that.data.devId = devId
    var time = options.time
    that.data.time = time
    console.log(time)
    that.setData({
      time:time
    })
    that.getstationdata()
    //背景音乐
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    player()
    function player() {
      backgroundAudioManager.title = '此时此刻'
      backgroundAudioManager.src = 'https://www.catcarwasher.com/washcar-admin/wx/wufenzhong.mp3'
    }
  
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
    this.countInterval()
    wx.createSelectorQuery().select('#canvas-one').boundingClientRect(function (rect) {//监听canvas的宽高
      console.log(rect);
      w = parseInt(rect.width / 2); //获取canvas宽的的一半
      h = parseInt(rect.height / 2); //获取canvas高的一半，
      //获取宽高的一半是为了便于找到中心点

      ctx.arc(w, h, w - 8, 0.75 * Math.PI, 2.25 * Math.PI); //绘制圆形弧线
      ctx.setStrokeStyle("#ededed"); //设置填充线条颜色
      ctx.setLineWidth("15");     //设置线条宽度
      ctx.setLineCap("round");        //设置线条端点样式
      ctx.stroke();     //对路径进行描边，也就是绘制线条。

      ctx.draw();       //开始绘制
    }).exec()
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