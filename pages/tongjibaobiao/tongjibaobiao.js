const app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    selectedNav: '00',
    shijian: '全部',
    mendian: '所有门店',
    showspinner: false,
    spinners: [],
    devid1: '',
    devid2: '',
    allreport: '',//全部
    mendianlist: [],//加盟商门店列表
    nearby: [
      {
        devName: '全部',
        id: '1',
      },
      {
        devName: '昨天',
        id: '2',
      },
      {
        devName: '本月',
        id: '3',
      }
    ],
    //mendianlistname:''
  },
  onLoad: function (options) {
    this.getalldata();
    //this.isBranch();
    this.getmendian()
  },

 
  //获取加盟商门店列表
  getmendian: function () {
    var that = this;
    var data = {
      phone: wx.getStorageSync('mobile'),
    }
    util.request_data("branch/getBranchDev", 'POST', data, function (res) {
      console.log(res)
      var mendianlist = res.data.data
      that.setData({
        mendianlist: mendianlist,
      })
    })
  },
  //获取全部报表数据
  getalldata: function () {
    var that = this;
    var data = {
      pageNo: 1,
      pageSize: 99,
      phone: wx.getStorageSync('mobile'),
      sheetTime: that.data.devid1,
      devID: that.data.devid2
    }
    util.request_data("branchSheet/getBranchSheet", 'POST', data, function (res) {
      console.log(res)
      var allreport = res.data.data;
      for (var i = 0; i < allreport.length; i++) {
        allreport[i].createTime = util.DateHelper(allreport[i].createTime, 'yyyy-MM-dd HH:mm')
      }
      that.setData({
        allreport: allreport
      })
    })
  },

  //统计报表详情
  reportdetail: function (e) {
    console.log(e)
    var that = this
    var position = e.currentTarget.dataset.id
    var reportId = that.data.allreport[position].id
    wx.navigateTo({
      url: '/pages/reports/reports?reportId=' + reportId,
    })
  },

  navitation: function (event) {
    let id = event.currentTarget.dataset.id;
    const that = this;
    console.log(id);
    if (id == that.data.selectedNav) {
      id = '00';
      that.setData({
        showspinner: false,
      })
    } else {
      that.setData({
        showspinner: true,
      })
    }
    console.log(id);
    that.setData({
      selectedNav: id,
    })
    let temps = that.data.spinners;
    if (id == '01') {
      temps = that.data.nearby;
    } else if (id == '02') {
      temps = that.data.mendianlist;
    }
    that.setData({
      spinners: temps,
    })
  },
  //选择时间、门店
  spinnerclick: function (event) {
    const that = this;
    console.log(event)
    let id = event.currentTarget.dataset.id;
    if (that.data.selectedNav == '01') {
      var sevName = that.data.nearby[id].devName
      var devid1 = that.data.nearby[id].id
      that.setData({
        showspinner: false,
        shijian: sevName,
        devid1: devid1
      })
    } else {
      var sevName = that.data.mendianlist[id].devName
      var devid2 = that.data.mendianlist[id].devID
      that.setData({
        showspinner: false,
        mendian: sevName,
        devid2: devid2
      })
    }
    that.getalldata()
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
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    //this.getalldata();
  },
})