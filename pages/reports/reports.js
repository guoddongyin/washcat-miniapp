// pages/reports/reports.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportId:'',//报表id
    reportdetail:'',//报表详情数据
    card: '',
    privateText: '',
    //single:''
    arrname:'',
    arrnum : '',
    maolirun:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var reportId = options.reportId
    this.setData({
      reportId: reportId
    })
    this.getreportdetail()
  },
  //获取报表详情数据
  getreportdetail:function() {
    var that = this;
    var data = {
      id: that.data.reportId,
    }
    util.request_data("branchSheet/getBranchSheetDetails", 'POST', data, function (res) {
      console.log(res)
      var reportdetail =  res.data.data
      var lirun = reportdetail.profitMoney - reportdetail.costMoney
      var card = JSON.parse(reportdetail.card);
      var privateText = JSON.parse(reportdetail.privateText);
      var arrname = [];
      var arrnum = []
      if (reportdetail.single==null){
        var arrname = '暂无';
        var arrnum = '暂无'
      }else{
        var single = JSON.parse(reportdetail.single);
        console.log(card);
        console.log(privateText)
        console.log(single)
        for (var i = 0; i < single.length; i++) {
          var singlename = single[i].money;
          var singlenum = single[i].num;
          arrname.push(singlename)
          arrnum.push(singlenum)
        }
      }
      
      that.setData({
        reportdetail: reportdetail,
        card: card,
        privateText:privateText,
        single: single,
        arrname: arrname,
        arrnum: arrnum,
        maolirun:lirun
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
    var that = this
    return {
      title: '',
      success(res) {
        console.log(res.shareTickets[0])
      }
    }
  }
})