//index.js
var util = require('../../utils/util.js');
//获取地图
Page({
  data: {
    latitude: 29.579439,
    longitude: 106.564369,
    markers: '',
    controls: [{
      id: 1,
      iconPath: '/images/dit-icon.png',
      position: {
        left: 20,
        top:400,
        width: 30,
        height: 30
      },
      clickable: true
    }],
    startimg:''
  },
  onLoad: function (options) {
    if (wx.getStorageSync('openid') == null || wx.getStorageSync('openid') == ''){
      wx.navigateTo({
        url: '/pages/authorization/authorization',
      })
    } 
    var that = this
    
    that.getphotodata()
    wx.getLocation({
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude 
        that.setData({
          latitude: latitude,
          longitude: longitude
        })

        that.requestdata(latitude, longitude)
      },
    })
    
    //测试用userid
    //wx.setStorageSync('IDID', '1')
    //wx.setStorageSync('openid', 'aabbcc')
  },
  //获取启动页图片
  getphotodata :  function () {
    var that = this
    var data = {
      mediaType : 2
    }
    util.request_data("banner/startImg", 'POST', data, function (res) {
      console.log(res)
      var startimg = res.data.data
      that.setData({
        startimg: startimg
      })
    })
  },
  //获取范围内设备信息
  requestdata: function (latitude, longitude) {
    var that = this
    var data = {
      lng: latitude,
      lat: longitude
    }
    util.request_data("washcardevStatus/getDevRange", 'POST', data, function (res) {
      console.log(res)
      var botlist = res.data.data
      var markerlist = []
      for (var i = 0; i < botlist.length; i++) {
        var model = {
          id: '',
          latitude: '',
          longitude: '',
          iconPath: '',
          width: 25,
          height: 30
        }
        model.iconPath = '/images/icon-dw.png'
        model.id = botlist[i].devId
        model.latitude = botlist[i].latitude
        model.longitude = botlist[i].longitude
        markerlist.push(model)
        //console.log(markerlist+"ddd")
      }
      that.setData({
        markers: markerlist
      })
     // console.log(markers + "ddd")
    })
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.src = 'https://www.catcarwasher.com/washcar-admin/wx/map.mp3' // 设置了 src 之后会自动播放 
  },
  clickcontrols:function (){
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude,//纬度 
          longitude: longitude,//经度 
        })
      }
    })
  },
  //点击图标跳到站点详情
  clickmarker: function (e) {
    console.log(e)
    var id = e.markerId
    wx.navigateTo({
      url: '../../pages/stationdetail/stationdetail?devId=' + id,
    })
  },

  onReady: function (e) {
    // this.mapCtx = wx.createMapContext('myMap')
  },
  stationlist: function () {
    wx.navigateTo({
      url: '/pages/stationlist/stationlist',
    })
  },
  personal:function() {
    wx.navigateTo({
      url: '/pages/personal/personal',
    })
  },
})
