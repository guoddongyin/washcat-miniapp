// pages/circularPro/circularPro.js
// const ctx = wx.createCanvasContext("bgCanvas"); //创建一个全局的canvas绘图上下文
// const ctx2 = wx.createCanvasContext("runCanvas");
// let mytime = "";
// let n = 0;
// var w = "";
// var h = "";
// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     score: 100, //传入的进度， 0~100，绘制到此参数处停止。
//   },
//   run(e) {
//     let that = this;
//     let src = that.data.src; //每个间隔所需绘制的弧度
//     let allSrc = that.data.allSrc; //总共需要绘制的弧度
//     n++;
//     if (src * n > allSrc) {
//       clearInterval(mytime); //如果绘制完成，停掉计时器，绘制结束
//       n = 0;
//       return;
//     }

//     let grade = Math.round(src * n / 1.5 * 100); //百分数
//     ctx2.arc(w, h, w - 8, 0.75 * Math.PI, (0.75 + src * n) * Math.PI); //每个间隔绘制的弧度
//     ctx2.setStrokeStyle("#1c3368");//设置填充线条颜色
//     ctx2.setLineWidth("15"); //设置线条宽度
//     ctx2.setLineCap("round");     //设置线条端点样式
//     ctx2.stroke();//对路径进行描边，也就是绘制线条。
//     ctx2.beginPath();
//     ctx2.setFontSize(40); //注意不要加引号
//     ctx2.setFillStyle("#333333");
//     ctx2.setTextAlign("center");
//     ctx2.setTextBaseline("middle");
//     ctx2.fillText(grade + "%", w, h);


//     ctx2.draw();
//   },
//   canvasTap() {
//     let that = this;
//     clearInterval(mytime);
//     mytime = setInterval(that.run, 1000)
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (e) {
//     let that = this;
//     let allSrc = 0.015 * that.data.score; //应该绘制的弧度
//     let src = allSrc / 100 //计算出每个间隔应该绘制多少弧度。 
//     that.setData({
//       src: src,
//       allSrc: allSrc
//     })
//     this.canvasTap();
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
//     wx.createSelectorQuery().select('#canvas-one').boundingClientRect(function (rect) {//监听canvas的宽高
//       console.log(rect);
//       w = parseInt(rect.width / 2); //获取canvas宽的的一半
//       h = parseInt(rect.height / 2); //获取canvas高的一半，
//       //获取宽高的一半是为了便于找到中心点

//       ctx.arc(w, h, w - 8, 0.75 * Math.PI, 2.25 * Math.PI); //绘制圆形弧线
//       ctx.setStrokeStyle("#ededed"); //设置填充线条颜色
//       ctx.setLineWidth("15");     //设置线条宽度
//       ctx.setLineCap("round");        //设置线条端点样式
//       ctx.stroke();     //对路径进行描边，也就是绘制线条。

//       ctx.draw();       //开始绘制
//     }).exec()
//   }
// })
//index.js
// 从从60到到0倒计时
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    that.setData({
      second: "60秒倒计时结束"
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}

Page({
  data: {
    second: 60
  },
  onLoad: function () {
    countdown(this);
  }
});