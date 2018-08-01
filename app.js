//app.js
App({
  onShow: function (e) {
    console.log("数据", e)

    // var shareTicket = e.shareTicket;

    // var fromID = '';
    // if (e.query.fromID) {
    //   fromID = e.query.fromID
    // }
    //wx.setStorageSync('fromID', fromID);
    // wx.setStorageSync('shareTicket', shareTicket);

    // var ticketetid = ''
    // if (e.query.ticketetid) {
    //   ticketetid = e.query.ticketetid
    // }
    // wx.setStorageSync("ticketetid", ticketetid);

    var ordersnss = ''
    if (e.query.ordersnss) {
      ordersnss = e.query.ordersnss
    }
    wx.setStorageSync("ordersnss", ordersnss)

  },
  globalData: {
    userInfo: null,
  }
})