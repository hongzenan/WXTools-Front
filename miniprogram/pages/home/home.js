// pages/deployFunctions/deployFunctions.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  doTest: function() {
    var param = {name: "kane"}
    wx.request({
      url: 'http://127.0.0.1:8080/wxtools/test',//请求地址路径
      data: param,//请求参数
      method:"get",//请求方式
      header:{//请求头
        "content-type": "application/json"  //"application/x-www-form-urlencoded"
      },
      success(res){
        if(res.data.success){
          console.log(res)
        }else{
          console.log(res)
        }
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    var self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        wx.uploadFile({
          filePath: filePath,
          name: 'file',
          url: 'http://localhost:8080/wxtools/fileUpload',
          // responseType: 'arraybuffer',
          header: {
            'content-type': 'multipart/form-data',
          },
          success: function(res) {
            // let imageUrl = wx.arrayBufferToBase64(res.data)
            let imageUrl = res.data
            console.log("hello: " + imageUrl)
            wx.navigateTo({
              url: '../storageConsole/storageConsole?imageUrl=' + imageUrl,
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

        // // 上传图片
        // const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        // wx.cloud.uploadFile({
        //   cloudPath,
        //   filePath,
        //   success: res => {
        //     console.log('[上传文件] 成功：', res)

        //     app.globalData.fileID = res.fileID
        //     app.globalData.cloudPath = cloudPath
        //     app.globalData.imagePath = filePath

        //     wx.navigateTo({
        //       url: '../storageConsole/storageConsole'
        //     })
        //   },
        //   fail: e => {
        //     console.error('[上传文件] 失败：', e)
        //     wx.showToast({
        //       icon: 'none',
        //       title: '上传失败',
        //     })
        //   },
        //   complete: () => {
        //     wx.hideLoading()
        //   }
        // })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
})