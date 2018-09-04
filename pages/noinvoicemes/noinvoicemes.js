// pages/noinvoicemes/noinvoicemes.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: (wx.getStorageSync('appdata')).length ? false : true,
    data: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    // console.log('onshow');
    wx.getStorage({
      key: 'appdata',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          data: res.data,
          condition: (res.data).length ? false : true,
        })
      }
    })
  },
  setStorg: function (arr) {
    // console.log('listset:'+arr.length)
    if (!arr.length) {
      this.setData({
        condition: true
      });
    }
    var appAll = [];
    this.setData({
      data: arr
    });
    for (var i = 0; i < arr.length; i++) {
      appAll.push(arr[i]);
    }
    // console.log(appAll)
    wx.setStorage({
      key: 'appdata',
      data: appAll,
      success: function (e) {
        //console.log(e, '更新存储完成')
      }
    })
  },
  //编辑
  edit: function (e) {
    var editid = e.currentTarget.dataset.eid;
    wx.navigateTo({
      url: '/pages/invoicetype/invoicetype?id=' + editid//实际路径要写全
    })
  },
  //详情
  toqrcode: function (e) {
    var qrcode = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/typedetail/typedetail?id=' + qrcode//实际路径要写全
    })
  },
  //删除
  delete: function (e) {
    var delid = e.currentTarget.dataset.id
    var dataArr = wx.getStorageSync('appdata');
    var that = this;
    // console.log(delid)  
    wx.showModal({
      // title: '提示',
      content: '你确定要删除吗?',
      confirmColor: '#64c4c7',
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < dataArr.length; i++) {
            var thisid = dataArr[i][0].id;
            if (thisid == delid) {
              dataArr.splice(i, 1);
              that.setStorg(dataArr)
            }
          }
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
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