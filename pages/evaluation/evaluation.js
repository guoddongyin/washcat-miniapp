// pages/evaluation/evaluation.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starFlag: 5,
    tupianstring2: '',
    pics: [],
    orderId: '',//订单id
    saveimglist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId
    this.data.orderId = orderId
    console.log(orderId)
  },
  //获取textarea输入的值
  content1: function (e) {
    var that = this;
    that.setData({
      content1: e.detail.value
    })
  },
  //跳转到抢购页面
  purchase:function(){
    wx.navigateTo({
      url: '/pages/paidcard/paidcard',
    })
  },
  //提交评论信息
  formSubmit:function (e){
    var that = this;
    var content1 = e.detail.value.content1; 
    var imgs = []
    if (that.data.saveimglist==''){
    }else{
      for (var i = 0; i < that.data.saveimglist.length; i++) {
        var img = { imgUrl: that.data.saveimglist[i] }
        imgs.push(img)
      }  
    }
    if (that.data.starFlag==5){
      starNum:5
    }else{
      starNum: that.data.starFlag
    }
      var data = {
        userId: wx.getStorageSync('IDID'),
        // orderId: that.data.orderId,
        orderId: wx.getStorageSync('orderId'),
        content: content1,
        starNum: that.data.starFlag,
        imgUrl: JSON.stringify(imgs)
        
      }
      console.log("参数", data);
      util.request_data("washcarEvaluate/saveWashcarEvaluateNum", 'POST', data, function (res) {
        console.log(res)
        success: {
          console.log('ggg')
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/mylist/mylist',
            })
          }, 1000)
        }
      })
  },
  
  //选择图片
  chooseImage: function () {//这里是选取图片的方法
    var that = this,
    pics = that.data.pics;
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
  //删除图片
  deleteImg: function (e) {
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    this.setData({
      pics: pics
    });
  },
  uploadimg2: function () {//这里触发图片上传的方法
    var token = '';
    var that = this
    var imglist = []
    that.data.saveimglist = []
    console.log("dadasdasd达大厦")
    var pics = that.data.pics;
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
            //tupianstring2: that.data.saveimglist.toString()
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
  //点击放大图片
  previewImage: function (event){
      var src = event.currentTarget.dataset.src;//获取data-src
      var imgList = event.currentTarget.dataset.list;//获取data-list
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
  },
  //评论星级选择
  change: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index
    that.setData({
      starFlag: index
    });
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
  },

})