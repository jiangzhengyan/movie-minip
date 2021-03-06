// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []

  },

  /**
   * 获取电影列表
   */
  getMovieList(e) {

    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    wx.cloud.callFunction({
      name: 'movielist',
      data: {
        start: e===1?0:this.data.movieList.length,
        count:10
      }
    }).then(res => {
      console.log(res, '结果')
      wx.hideLoading()
      if (JSON.parse(res.result).subjects.length == 0) {
        wx.showToast({
          title: '已经是最后一条了!',
        })
        return;
      }

      this.setData({
        movieList: e === 1 ? JSON.parse(res.result).subjects:this.data.movieList.concat(JSON.parse(res.result).subjects)
      })

    }).catch(err => {
      console.log(err,'失败')
      wx.hideLoading()
      wx.showToast({
        title: '加载失败!',
      })

    })
  },
  /**
   * 去详情
   */
  gotoComment: function(event) {
    var movieid = event.target.dataset.movieid;

    console.log(movieid)
    wx.navigateTo({
      url: '../comment/comment?movieid=' + movieid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getMovieList()
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
   
    this.getMovieList(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    this.getMovieList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})