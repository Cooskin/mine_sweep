// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnAry: ['简单', '一般', '困难'],
    gameAry: [],
    is_begin: false,  // 开始
    sign_tap: false,  // 标记
    refresh: false,   // 刷新
    mine_num: 10,     // 地雷数量
    time: {h: '00', m: '00', s: '00',}, // 时间
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // jc o
    this.setData({is_begin: true})
    this.resetAry ()
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

  /**
   * jc 1
   * _begin
  */

  /**
   * 重置数组
  */
  resetAry () {
    const _this = this
    let newAry = new Array()
    for (let i = 0; i < 10; i++) {
      let arr = new Array()
      for (let j = 0; j < 10; j++) {
        let obj = new Object({
          num: 0,
          is_tap: false,
          is_sign: false
        })
        arr.push(obj)
      }
      newAry.push(arr)
    }
    _this.setData({
      gameAry: newAry,
      refresh: true,
      mine_num: 10,
      time: {
        h: '00',
        m: '00',
        s: '00'
      }
    })
    console.log(_this.data)
    clearInterval(_this.data.timer)
    setTimeout(() => {
      _this.setData({refresh: false})
    },1000)
  },
  /**
   * 开始游戏
  */
  begin (data) {
    const _this = this
    _this.setData({is_begin: true})
    console.log(data.currentTarget.dataset.itme)
  },
  /**
   * 返回
  */
  cls_game () {
    const _this = this
    _this.setData({is_begin: false})
    console.log('返回')
  },
  /**
   * 点击小方块
  */
  tap (data) {
    const _this = this
    const i = data.currentTarget.dataset.i
    const j = data.currentTarget.dataset.j
    const tapObj = `gameAry[${i}][${j}].is_tap`
    const signObj = `gameAry[${i}][${j}].is_sign`

    // 判断旗子的数量 插满十个旗子 结束游戏
    if (_this.data.mine_num > 0) {

      if (_this.data.gameAry[i][j].is_sign) {
        _this.setData({
          [tapObj]: !_this.data.gameAry[i][j].is_tap,
          [signObj]: !_this.data.gameAry[i][j].is_sign,
          sign_tap: !_this.data.sign_tap
        })
        return
      }
      // 判断 是否可点击
      if (!_this.data.gameAry[i][j].is_tap) {

        // 翻开 小方块
        _this.setData({[tapObj]: !_this.data.gameAry[i][j].is_tap})
        // 开始计时
        if (!_this.data.timer) {
          _this.setTime()
        }
        // 是否能 插旗子
        if (_this.data.sign_tap) {
          _this.setData({
            sign_tap: !_this.data.sign_tap,
            [signObj]: !_this.data.gameAry[i][j].is_sign,
            mine_num: _this.data.mine_num - 1
          })
        }
      }
    } else {
      _this.setData({[signObj]: false})
      wx.showToast({
        title: '比心',
        icon: 'none'
      })
    }
  },
  /**
   * 开启 标记
  */
  sign () {
    const _this = this
    _this.setData({sign_tap: !_this.data.sign_tap})
  },

  /**
   * 计时器
  */
  setTime () {
    const _this = this
    console.log(_this.data.timer)
    let tiemr

    tiemr = setInterval(() => {

      let h = _this.data.time.h
      let m = _this.data.time.m
      let s = _this.data.time.s

      s = parseInt(s) + 1

      if (s > 59) {
        s = '00'
        m = parseInt(m) + 1
      }
      if (m > 59) {
        m = '00'
        h = parseInt(m) + 1
      }


      if (s < 10) {
        s = '0' + parseInt(s)
      }
      if (m < 10) {
        m = '0' + parseInt(m)
      }
      if (h < 10) {
        h = '0' + parseInt(h)
      }
      _this.setData({
        ["time.h"]: h,
        ["time.m"]: m,
        ["time.s"]: s,
      })
    }, 1000)
    _this.setData({timer: tiemr})
  }
})
// jc 0