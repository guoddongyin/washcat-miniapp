var app = getApp;

Page({

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

  login: function (userinfo) {
    console.log(userinfo)
    if (userinfo.detail.errMsg == 'getUserInfo:ok') {
      this.gotoLogin();
    }
    else if (userinfo.detail.errMsg == 'getUserInfo:fail auth deny') { // 当用户点击拒绝时

    }
  },
  canILogin: function () {
    if (!wx.canIUse('button.open-type.getUserInfo')) { // 对应的功能就是通过按钮获取用户资料
      /**
        wx.showModal({
          title: '温馨提示',
          content: '您当前的微信版本太低了，不能进行登录操作',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        }) // 向用户提示需要升级微信
        */
    } else {
      console.log('我来了22222')
    }
  },

  gotoLogin: function () {
    let self = this;
    var qun_id = 0;
    var relate_wx_qunid = '';
    var relate_wx_miyao = '';
    // var shareTicket = wx.getStorageSync('shareTicket')
    wx.login({
      success: function (res_login) {//登录成功
        console.log(res_login)
        if (res_login.code) {
          console.log(res_login.code)

          wx.getUserInfo({//授权
            withCredentials: true,
            lang:'zh_CN',
            success: function (res_user) {
              console.log(res_user)
              var jsonData = {
                code: res_login.code,
                encryptedData: res_user.encryptedData,
                iv: res_user.iv,
              };

              console.log("参数", jsonData)
              wx.request({
                url: 'https://www.catcarwasher.com/washcar-admin/api/weChat/authorizeUser', //接口地址
                method: "POST",
                data: jsonData,
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值application/json
                },
                success: function (res) {
                  console.log("说明我来了444", res)
                   var openid = res.data.data.openid;
                   var userID = res.data.data.id
                  try {
                    wx.setStorageSync('openid', openid)//将openid存储在缓存中
                    wx.setStorageSync('IDID', userID);
                  } catch (e) {
                  }
                  console.log("说明我来了555")
                  wx.navigateBack({ changed: true });//返回上一页  

                }, fail: function (fail) {
                  console.log(fail)

                }
              })
            },
            fail: function (fail) {
              console.log(fail)


            }
          })

        }
      }, fail: function (fail) {
        console.log("失败", fail)

      }
    });
  },
  //返回
  goreturn: function () {

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