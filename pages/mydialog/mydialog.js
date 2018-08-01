// pages/mydialog/mydialog.js
var util = require('../../utils/util.js');
 Page({
   data: {
     activeIndex: 0,//默认选中第一个
     numArray: [10, 20, 30, 40, 50, 60, 70, 80, 90]
   },

   activethis: function (event) {//点击选中事件
     var thisindex = event.currentTarget.dataset.thisindex;//当前index
     this.setData({
       activeIndex: thisindex
     })
   }
 })

//   /**
//   * 页面的初始数据
//   */
//   data: {
//     starFlag: 5,
//     // isAdministrators:true
//     isHidden: true,
//     titleMsg: " ",
//     inputHidden: false,
//     cancleBtn: false,
//     inputPlaceHolder: ""
//   },

//   onMyEvent: function (e) {
//     var that = this;
//     console.log("e.detail :", e.detail)

//     that.setData({
//       isHidden: true,
//       // inputHidden: false
//     })

//   },
//   changeOne: function () {
//     var that = this;
//     that.setData({
//       starFlag: 1
//     });
//   },
//   changeTwo: function () {
//     var that = this;
//     that.setData({
//       starFlag: 2
//     });
//   },
//   changeThree: function () {
//     var that = this;
//     that.setData({
//       starFlag: 3
//     });
//   },
//   changeFour: function () {
//     var that = this;
//     that.setData({
//       starFlag: 4
//     });
//   },
//   changeFive: function () {
//     var that = this;
//     that.setData({
//       starFlag: 5
//     });
//   },

//   showCompomentDialog: function () {
//     var that = this;
//     that.setData({
//       isHidden: false,
//       titleMsg: "你有未完成的订单，是否立即进入",
//       // inputPlaceHolder: "请输入想要发送的内容",
//       inputHidden: true,
//       // cancleBtn: true,
//     })
//   },

// })
// Page({
//   formSubmit: function (e) {
//     // var info = e.detail.value
//     if (e.detail.value.xm.length == 0 || e.detail.value.xq.length == 0 || e.detail.value.lxfs.length == 0 || e.detail.value.xqmz.length == 0) {

//       wx.showModal({

//         title: '姓名或联系方式或需求或小区名字不得为空!',
//         content: '很棒棒哟',

//       })

//     } else if (e.detail.value.lxfs.length != 11) {
//       wx.showToast({

//         title: '请输入11位手机号码!',

//         icon: 'loading',

//         duration: 1500

//       })

//       setTimeout(function () {

//         wx.hideToast()

//       }, 2000)


//     } else {
//       wx.request({
//         url: 'https://www.catcarwasher.com/washcar-admin/api/userEnterpris/saveUserEnterpris', //仅为示例，并非真实的接口地址
//         header: {
//           'content-type': 'application/x-www-form-urlencoded' // 默认值
//         },
//         method: 'POST',
//         data: { xm: e.detail.value.xm, lxfs: e.detail.value.lxfs, xq: e.detail.value.xq, xqmz: e.detail.value.xqmz },
//         success: function (res) {
//           if (res.data.status == 0) {

//             wx.showToast({

//               title: res.data.info,

//               icon: 'loading',

//               duration: 1500

//             })

//           } else {

//             wx.showToast({

//               title: res.data.info,//这里打印出登录成功

//               icon: 'success',

//               duration: 1000

//             })

//           }

//         }
//       })
//     }
//   }
// })

