// pages/enterpriseuser/enterpriseuser.js
var util = require('../../utils/util.js');
Page({
  /**
  * 页面的初始数据
  */
  data: {
    pics: [],
    tupianstring2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid = options.Cid
    this.data.cid = cid
  },

  //获取姓名输入的值
    name1:function(e){
      var that = this;
      that.setData({
        name1: e.detail.value
      })
    },
  //获取联系人输入的值
  username1: function (e) {
    var that = this;
    that.setData({
      username1: e.detail.value
    })
  },

  //点击放大图片
  previewImage: function (e) {
    var src = e.currentTarget.dataset.src;//获取data-src
    var imgList = e.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  //删除图片
  deleteImg: function (e) {
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    this.setData({
      pics: pics
    });
  },
   //获取手机号码输入的值
  phone2:function (e) {
    var that = this;
    that.setData({
      phone2:e.detail.value
    })
  },
  formSubmit:function(e){
    var that = this;
    var name1 = e.detail.value.name1;   //获取企业名称初始值
    var username1 = e.detail.value.username1; //获取联系人初始值
    var phone2 = e.detail.value.phone2; //获取电话号码初始值
    var myreg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    if (name1.length == 0 || username1.length == 0 || phone2.length == 0 || that.data.tupianstring2.length == 0) {
      wx.showToast({
        title: '名称、联系人、电话号码、营业执照不能为空',
        icon: 'none'
      })
    } else if (phone2.length != 11) {
      wx.showToast({
        title: '电话号码要为11位',
        icon: 'none'
      })
    } else if (!myreg.test(phone2)) {
      wx.showToast({
        title: '电话格式不正确',
        icon: 'none'
      })
    } else {
      var data = {
        userId: wx.getStorageSync('IDID'),
        openId: wx.getStorageSync('openid'),
        userTypes: 1,
        name: username1,
        enterpriseName: name1,
        phone: phone2,
        imgUrl: that.data.tupianstring2
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
              url: '/pages/buycardqy/buycardqy',
            })
          }, 1000)
        }
        // fail: {
        //   console.log('cuowu' + ':' + res)
        // }
      })
    }
  },

  //选择图片
  chooseImage: function () {//这里是选取图片的方法
    var that = this,
      pics = this.data.pics;
    wx.chooseImage({
      count: 3 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });

        that.uploadimg2()
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },

  uploadimg2: function () {//这里触发图片上传的方法
    var token = '';
    var that = this
    var imglist = []
    that.data.saveimglist = []
    console.log("dadasdasd达大厦")
    var pics = this.data.pics;
    for (var i = 0; i < pics.length; i++) {
      wx.uploadFile({//将图片上传到服务器
        url: 'https://www.catcarwasher.com/washcar-admin/api/upload/uploads', //接口地址
        filePath: pics[i],
        name: 'file',
        header: {
          'content-type': 'application/json', // 默认值application/json
        },
        formData: {
          'ewm': 'test'
        },
        success: function (res) {
          console.log(res.data)

          var data = JSON.parse(res.data)//json 序列化
          that.data.saveimglist.push(data.data.link)

          that.setData({
            tupianstring2: that.data.saveimglist.toString()
          })
          wx.hideLoading();
          if (data.code == 1) {
          } else {
            wx.showToast({
              title: data.errmsg,
              icon: 'loading',
              duration: 1500
            })
          }
        }, 
        fail: function (fail) {
          console.log('fail失败')
          wx.hideLoading();
          wx.showToast({
            title: '请求异常',
            icon: 'loading',
            duration: 1500
          })
        }
      })
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