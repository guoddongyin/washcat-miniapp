//index.js
var util = require('../../utils/util.js');
//获取地图
Page({
  data: {
    latitude: 29.579439,
    longitude: 106.564369,
    markers: [],
  },
  onLoad: function (options) {
    if (wx.getStorageSync('openid') == null || wx.getStorageSync('openid') == ''){
      wx.navigateTo({
        url: '/pages/authorization/authorization',
      })
    } 
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
    //  wx.setStorageSync('openid', 'o8WdG4-LbJhrkJmQwbZLVsMDqWDE')
    // wx.navigateTo({
    //   url: '../../pages/login/login',
    // })
  },

  requestdata: function (latitude, longitude) {
    var that = this
    var data = {
      lng: latitude,
      lat: longitude
    }
    util.request_data("storage/getStorageRange", 'POST', data, function (res) {
      console.log(res)
      var botlist = res.data.data
      var markerlist = []
      for (var i = 0; i < botlist.length; i++) {
        var model = {
          id: '',
          latitude: '',
          longitude: '',
          iconPath: '',
          width: 20,
          height: 30
        }
        if (botlist[i].num == 0) {
          model.iconPath = '/images/icon_0.png'
        } else if (botlist[i].num == 1) {
          model.iconPath = '/images/icon_1.png'
        } else if (botlist[i].num == 2) {
          model.iconPath = '/images/icon_2.png'
        } else if (botlist[i].num == 3) {
          model.iconPath = '/images/icon_3.png'
        } else if (botlist[i].num == 4) {
          model.iconPath = '/images/icon_4.png'
        } else if (botlist[i].num == 5) {
          model.iconPath = '/images/icon_5.png'
        } else if (botlist[i].num == 6) {
          model.iconPath = '/images/icon_6.png'
        } else if (botlist[i].num == 7) {
          model.iconPath = '/images/icon_7.png'
        } else if (botlist[i].num == 8) {
          model.iconPath = '/images/icon_8.png'
        } else if (botlist[i].num == 9) {
          model.iconPath = '/images/icon_9.png'
        } else if (botlist[i].num == 10) {
          model.iconPath = '/images/icon_10.png'
        } else {
          model.iconPath = '/images/icon_10j.png'
        }
        model.id = botlist[i].id
        model.latitude = botlist[i].latitude
        model.longitude = botlist[i].longitude

        markerlist.push(model)
      }

      that.setData({
        markers: markerlist
      })
    })
  },


  requestdata: function (latitude, longitude) {
    var that = this
    var data = {
      lng: latitude,
      lat: longitude
    }

    util.request_data("washcardevStatus/getDevRange", 'POST', data, function (res) {
      console.log(res)
      console.log("ddd");
      var botlist = res.data.data;
      console.log(botlist);
      var markerlist = []
      for (var i = 0;i< botlist[i].length;i++){
        var model = {
          id: '',
          latitude: '',
          longitude: '',
          iconPath: '',
          width: 20,
          height: 30
        }
        model.iconPath = '/images/dw-icon.png'
        model.id = botlist[i].devId
        model.latitude = botlist[i].latitude
        model.longitude = botlist[i].longitude
        markerlist.push(model)
      }
       
      that.setData({
        markers: markerlist
      })
    })
  },

  // clickmarker: function (e) {
  //   console.log(e)
  //   var id = e.markerId

  //   wx.navigateTo({
  //     url: '../../pages/renrencang/renrencang?storageId=' + id,
  //   })
  // },

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
