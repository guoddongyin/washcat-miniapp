// pages/stationditu/stationditu.js
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
        top: 400,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },
  onLoad: function (options) {
    var that = this
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
        model.iconPath = '/images/dw-icon.png'
        model.id = botlist[i].devId
        model.latitude = botlist[i].latitude
        model.longitude = botlist[i].longitude
        markerlist.push(model)
        console.log(markerlist + "ddd")
      }
      that.setData({
        markers: markerlist
      })
      // console.log(markers + "ddd")
    })
  },
  clickcontrols: function () {
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
  personal: function () {
    wx.navigateTo({
      url: '/pages/personal/personal',
    })
  },
})
