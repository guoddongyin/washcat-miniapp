var util = require('../../utils/util.js');
Page({
  data: {
    date: '',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    money:'',
    userInfo: {},
    // userListInfo: [{
    //   icon: '../../images/icon-card.png',
    //   text: '充值猫卡',
    //   dec: '2018-10-01',
    // }, {
    //   icon: '../../images/icon-gx.png',
    //   text: '共享用户返利',
    //   dec: '2018-10-01',
    // }, {
    //   icon: '../../images/icon-card.png',
    //   text: '充值猫卡',
    //   dec: '2018-10-01',
    // }]
  },

  onLoad: function (options) {
    var that = this
    var money = options.money
    that.data.money = money
    this.setData({
      money:money
    })
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

  },


  showDatePicker: function (e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function (e) {
    console.log('datePickerOnSureClick');
    console.log(e);
    this.setData({
      date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },
})