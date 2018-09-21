// pages/shareduser/shareduser.js
var util = require('../../utils/util.js');
Page({
  name2: function (e) {   //获取姓名输入的值
    var that = this;
    that.setData({
      name2: e.detail.value
    })
  },
  ID_num2: function (e) {    //获取电话号码输入的值
    var that = this;
    that.setData({
      ID_num2: e.detail.value
    })
  },
//提交用户信息
  binduser: function (e) {
    var that = this;
    var name2 = e.detail.value.name2;   //获取姓名初始值
    var ID_num2 = e.detail.value.ID_num2; //获取电话号码初始值
    var myreg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    if (name2.length == 0 || ID_num2.length == 0){
      wx.showToast({
        title: '姓名和电话不能为空',
        icon:'none'
      })
    } else if (ID_num2.length !=11){
      wx.showToast({
        title: '电话号码要为11位',
        icon: 'none'
      })
    } else if (!myreg.test(ID_num2)){
      wx.showToast({
        title: '电话格式不正确',
        icon: 'none'
      })
    }else{
      var data = {
        userId: wx.getStorageSync('IDID'),
        openId: wx.getStorageSync('openid'),
        userTypes: 2,
        name: name2,
        phone: ID_num2
      }
      console.log("参数", data);
      util.request_data("userEnterpris/saveUserEnterpris", 'POST', data, function (res) {
        console.log(res)
        success: {
          console.log('ggg')
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/buycard/buycard',
            })
          }, 1000)
        }
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
  
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
  // buycard:function(){
  //   wx.navigateTo({
  //     url: '/pages/buycard/buycard',
  //   })
  // }
})