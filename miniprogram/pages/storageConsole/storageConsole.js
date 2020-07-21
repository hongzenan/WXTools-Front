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

    this.setData({
      fileID,
      cloudPath,
      imagePath,
    })

    console.group('文件存储文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    console.groupEnd()
  },
  downloadImage: function(options) {
    wx.downloadFile({
      url: app.globalData.imagePath,
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function(err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success(settingData) {
                  console.log(settingData)
                  if (settingData.authSetting['scope.writePhotosAlbumscope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      }
    })
  },

})