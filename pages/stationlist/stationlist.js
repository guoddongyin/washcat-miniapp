var amapFile = require('../../libs/amap-wx.js');
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listqu: [],
    listwei: [],
    cityname: '',
    clickpos: 0,
    isfirst: true,
    status:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var status = options.status
    console.log(status)
    that.setData({
      status: status
    })
    //获取当前城市
    var myAmapFun = new amapFile.AMapWX({key:'9197483278da7bb821f345db0c68cc87'});
    myAmapFun.getRegeo({
      success: function (res) {
        console.log(res)
        console.log("11111")
        var cityname = res[0].regeocodeData.addressComponent.province
        console.log(cityname)
        that.data.cityname = cityname
        wx.setStorageSync("cityname", cityname)

        that.setData({
          cityname: that.data.cityname
        })

        that.requestqulist()
      },
      fail: function (res){
        console.log(res)
      }
    })


  },

  //获取当前城市开通的区县
  requestqulist: function () {
    var that = this
    var data = {
      pageNo: 1,
      pageSize: 999,
      // city: that.data.cityname.replace("市",' ')
      city: that.data.cityname
    }

    util.request_data("washcardevStatus/getDevCounty", 'POST', data, function (res) {
      console.log(res)
      var botlist = res.data.data.list
      var all = {
        county: '全市'
      }

      botlist.unshift(all)

      that.setData({
        listqu: botlist,
        clickpos: 0
      })
      //获取当前区县
      that.getCanglist()
    })
  },

  getCanglist: function () {
    var that = this
    var county = ''
    var position = that.data.clickpos
    if (position == 0) {
      //获取全市
      var data = {
        pageNo: 1,
        pageSize: 10,
        city: that.data.cityname
        //city: that.data.cityname.replace("市", ' '),
        //county: county,
      }

    } else {
      //获取当前区县
      county = that.data.listqu[position].county
      var data = {
        pageNo: 1,
        pageSize: 10,
        //city: that.data.cityname.replace("市", ' '),
        city: that.data.cityname,
        county: county,
      }
    }
   

    util.request_data("washcardevStatus/getDevAddress", 'POST', data, function (res) {
      console.log(res);
      console.log("gggg");
      var botlist = res.data.data.list;
      that.setData({
        listwei: botlist,
      })
    })

  },

  //选择区后切换数据
  choosequ: function (e) {
    console.log(e)
    var position = e.currentTarget.dataset.id
    this.setData({
      clickpos: position
    })
    this.getCanglist()
  },

  choosecity: function () {
    wx.navigateTo({
      url: '../../pages/choosecity/choosecity',
    })
    this.setData({
      isfirst: false
    })
  },

  //详情
  godetail: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id.devId
    wx.navigateTo({
      url: '../../pages/stationdetail/stationdetail?devId=' + id,
    })
  },
  //返回企业用户
  gobackstation: function (e) {
    var id = e.currentTarget.dataset.id.devId
    var name = e.currentTarget.dataset.id.devName
    console.log(name)
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var qycarddata = prevPage.data.qycarddata;
    qycarddata.devId = id;
    qycarddata.devName = name;
    prevPage.setData({
      qycarddata: qycarddata,
    })
    console.log(prevPage)
    wx.navigateBack();
  },
  //返回共享用户
  gobackstation2: function (e) {
    var id = e.currentTarget.dataset.id.devId
    var name = e.currentTarget.dataset.id.devName
    console.log(name)
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var qycarddata = prevPage.data.qycarddata;
    qycarddata.devId = id;
    qycarddata.devName = name;
    prevPage.setData({
      qycarddata: qycarddata,
    })
    console.log(prevPage)
    wx.navigateBack();
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
    var that = this
    if (!that.data.isfirst) {
      var cityname = wx.getStorageSync('cityname2')

      that.setData({
        cityname: cityname
      })

      that.requestqulist()
    }

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
  onShareAppMessage: function (e) {
    var that = this
    return {
      // path: '/pages/',
      success(res) {
        console.log(res.shareTickets[0])
      }
    }
  },
})