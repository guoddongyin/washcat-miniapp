const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}



const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

///Date 1528957600773 格式化
function DateHelper(dateStr, formatStr) {
  //转化为时间类型
  // var obj = new Date(parseInt(dateStr.replace("/Date(", "").replace(")/", ""), 10));
  var obj = new Date(parseInt(dateStr, 10));
  if (formatStr != null && formatStr != "" && formatStr != "undefined") {
    return obj.Format(formatStr);
  }
  return obj.Format("yyyy-MM-dd HH:mm:ss");
}

Date.prototype.Format = function (fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1,                 //月份   
    "d+": this.getDate(),                    //日   
    "H+": this.getHours(),                   //小时   
    "m+": this.getMinutes(),                 //分   
    "s+": this.getSeconds(),                 //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function phonenumber(phonenum) {
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  if (!myreg.test(phonenum)) {
    return true
  } else {
    return false
  }
}

//下载文件
function download_File(url, success) {
  const that = this;
  wx.downloadFile({
    src: url,
    success: function (res) {

      success(res.path)
    }
  })
}

//普通接口
function request_data(url, method, data, success) { //封装请求方式
  var newdata = [];
  var token = '';
  wx.showLoading({
    title: '加载中',
  })
  try {
    var value = wx.getStorageSync('token')//调用API从本地缓存中获取数据
    console.log(value)
    if (value) {
      console.log(value)
      token = value;
    }
  } catch (e) {
    // Do something when catch error
    console.log(e)
  }

  wx.request({
    // url: 'https://cq-hundun-university.3zht.com/api/v1/' + url, //接口地址
    //url: 'http://120.27.234.156:443/washcar-admin/api/' + url, //接口地址
    url: 'https://www.catcarwasher.com/washcar-admin/api/' + url, //接口地址
    method: method,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      'token': token//将token
    },
    success: function (res) {
      wx.hideLoading();
      if (res.data.errcode == 1) {
        console.log('我来了111')
        success(res);

      } else if (res.data.errcode == 10200) {
        console.log('我来了222')
        wx.showModal({
          title: '温馨提示',
          content: '当前页面需要登录才能获取相应信息',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/authorization/authorization',
              })
            }
          }
        }) // 向用户提示需要升级微信
      } else {
        console.log('我来了333')
        wx.showToast({
          title: res.data.errmsg,
          icon: 'loading',
          // image: '../../images/err_icon.png',  //自定义图标的本地路径，image 的优先级高于 icon  
          duration: 1500
        })
      }

    }, 
    fail: function (fail) {
      console.log(fail)
      wx.hideLoading()
      wx.showToast({
        title: '请求异常',
        icon: 'loading',
        image: '../../images/err_icon.png',  //自定义图标的本地路径，image 的优先级高于 icon  
        duration: 1500
      })
    }
  })
};

//上传图片
function upload_img(url, data, success) {
  var token = '';
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      console.log(tempFilePaths)

      wx.showLoading({
        title: '加载中',
      });
      try {
        var value = wx.getStorageSync('token')//调用API从本地缓存中获取数据
        if (value) {
          console.log(value)
          token = value;
        }
      } catch (e) {
        // Do something when catch error

        console.log(e)
      }

      wx.uploadFile({//将图片上传到服务器
        url: 'https://cq-hundun-university.3zht.com/api/v1/' + url, //接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        header: {
          'content-type': 'application/json', // 默认值application/json
          'token': token//将token
        },
        formData: {
          'ewm': 'test'
        },
        success: function (res) {
          var data = JSON.parse(res.data)//json 序列化
          wx.hideLoading();
          if (data.code == 0) {
            success(data);

          } else {
            wx.showToast({
              title: data.msg,
              icon: 'loading',
              // image: '../../images/err_icon.png',  //自定义图标的本地路径，image 的优先级高于 icon  
              duration: 1500
            })
          }
        }, fail: function (fail) {
          console.log(fail)
          wx.hideLoading();
          wx.showToast({
            title: '请求异常',
            icon: 'loading',
            image: '../../images/err_icon.png',  //自定义图标的本地路径，image 的优先级高于 icon  
            duration: 1500
          })
        }

      })

    }
  })

};

//多张图片上传
function uploadimg(data) {
  var that = this,
    i = data.i ? data.i : 0,//当前上传的哪张图片
    success = data.success ? data.success : 0,//上传成功的个数
    fail = data.fail ? data.fail : 0;//上传失败的个数
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'file',//这里根据自己的实际情况改
    formData: null,//这里是上传图片时一起上传的数据
    success: (resp) => {
      success++;//图片上传成功，图片上传成功的变量+1
      console.log(resp)
      console.log(i);
      //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
    },
    fail: (res) => {
      fail++;//图片上传失败，图片上传失败的变量+1
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      console.log(i);
      i++;//这个图片执行完上传后，开始上传下一张
      if (i == data.path.length) {   //当图片传完时，停止调用          
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }
    }
  });
}

//下载文件
function download_File2(url, success) {
  const that = this;
  // wx.getImageInfo({
  //   src: url,
  //   success: function (res) {
  //     success(res.path)
  //   }
  // })


  wx.downloadFile({
    url: url,
    success: function (sres) {
      console.log("111", sres)
      wx.saveFile({
        tempFilePath: sres.tempFilePath,
        success: function (res) {
          console.log(res)
          var savedFilePath = res.savedFilePath
          success(savedFilePath)
        }
      })
        ;
    }, fail: function (fres) {
      console.log(fres)
    }
  })


}

//防止连续点击
function buttonClicked(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 500)
}

module.exports = {
  formatTime: formatTime,
  request_data: request_data,
  upload_img: upload_img,
  download_File: download_File,
  download_File2: download_File2,
  uploadimg: uploadimg,
  DateHelper: DateHelper,
  buttonClicked: buttonClicked,
  phonenumber: phonenumber
}
