// pages/comment/comment.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    detail: {},
    movieid: -1,
    content: '',
    score: 5,
    images: [],
    fileIds: [],
  },
  onContentChange: function(event) {
    this.setData({
      content: event.detail
    })

  },

  onScoreChange: function(event) {
    this.setData({
      score: event.detail
    })
  },
  uploadImg: function(event) {
    //选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      success: res => {
        console.log(res.tempFilePaths, '===========')
        this.setData({
          images: this.data.images.concat(res.tempFilePaths),
        })
      }
    })
  },
  submit: function(event) {
    wx.showLoading({
      title: '评论中..',
    })
    let promiseArr = [];
    for (let i = 0; i < this.data.images.length; i++) {
      let item = this.data.images[i];
      let suffix = /\.\w+$/.exec(item)[0];
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: item,
          success: res => {

            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            })
            reslove();
          },
          fail: console.error
        })
      }))
    }

    Promise.all(promiseArr).then(res => {


      db.collection('comment').add({
        data: {

          content: this.data.content,
          score: this.data.score,
          movieid: this.data.movieid,
          fileIds: this.data.fileIds,

        }

      }).then(re=>{
        wx.hideLoading();
        wx.showToast({
          title: '评价成功!',
        })
      }).catch(err=>{
        wx.hideLoading();
        wx.showToast({
          title: '评价失败!',
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      movieid: options.movieid
    })
    wx.cloud.callFunction({
      name: 'getDetail',
      data: {
        movieid: options.movieid
      }
    }).then(res => {
      console.log(res, 'okokok')
      this.setData({
        detail: JSON.parse(res.result)
      })
    }).catch({

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})