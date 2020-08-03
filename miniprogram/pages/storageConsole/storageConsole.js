// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
  },

  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData

    let tmpUrl = options.imageUrl
    console.log("tmpUrl: " + tmpUrl)

    this.setData({
      fileID,
      cloudPath,
      imagePath,
      tmpUrl
    })
    

    console.group('文件存储文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    console.groupEnd()
  },
  downloadImage: function(options) {

    var self = this
    var param = {fileName: this.data.tmpUrl}
    console.log("kane : " + this.data.tmpUrl)
    wx.request({
      url: 'http://localhost:8080/wxtools/getImage',
      data: param,
      method: "get",
      responseType: 'arraybuffer',
      success(res) {
        let imageUrl = 'data:image/png;base64,'+wx.arrayBufferToBase64(res.data)
        console.log(imageUrl)
        app.globalData.filePath = imageUrl
        self.setData({
          codeUrl:imageUrl
        })
      }
    })

    // wx.getImageInfo({
    //   src: 'http://localhost:8080/wxtools/getImage',
    //   success: (res) => {
    //       let imageUrl = "data:image/gif;base64," + res.data
    //       console.log("hello: " + imageUrl)
    //       app.globalData.filePath = imageUrl
    //   },
    //   fail: (res) => {},
    //   complete: (res) => {},
    // })

    // wx.downloadFile({
    //   url: app.globalData.imagePath,
    //   success: function(res) {
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success(res) {
    //         wx.showToast({
    //           title: '保存成功',
    //           icon: 'success',
    //           duration: 2000
    //         })
    //       },
    //       fail: function(err) {
    //         if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
    //           wx.openSetting({
    //             success(settingData) {
    //               console.log(settingData)
    //               if (settingData.authSetting['scope.writePhotosAlbumscope.writePhotosAlbum']) {
    //                 console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
    //               } else {
    //                 console.log('获取权限失败，给出不给权限就无法正常使用的提示')
    //               }
    //             }
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
  },

})