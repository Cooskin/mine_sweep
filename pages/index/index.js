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
    timer: null,
    stop: false,
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
          type: 0,
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
      stop: false,
      time: {
        h: '00',
        m: '00',
        s: '00'
      }
    })
    _this.randomMine()
    _this.mine()
    clearInterval(_this.data.timer)
    _this.setData({timer: null})
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
    const gameAry = _this.data.gameAry
    const i = data.currentTarget.dataset.i
    const j = data.currentTarget.dataset.j
    const tapObj = `gameAry[${i}][${j}].is_tap`
    const signObj = `gameAry[${i}][${j}].is_sign`
    // const type = `gameAry[${i}][${j}].type`

    if (_this.data.stop) {
      return
    } else {
      // 开始计时
      if (!_this.data.timer) {
        _this.setTime()
      }
    }

    // 是否能 插旗子
    if (_this.data.sign_tap) {
      if (_this.data.mine_num) {
        _this.setData({
          sign_tap: !_this.data.sign_tap,
          mine_num: _this.data.mine_num - 1
        })
      }

      // console.log(_this.data.mine_num)
      gameAry[i][j].is_sign = !gameAry[i][j].is_sign
      if (!_this.data.mine_num) {
        wx.showToast({
          title: '比心',
          icon: 'none'
        })
        console.log('---------------------')
      }

    } else {
      if (_this.data.gameAry[i][j].is_sign) {
        _this.setData({
          [signObj]: !_this.data.gameAry[i][j].is_sign,
          mine_num: _this.data.mine_num + 1
        })
        return
      }
      // 判断 是否可点击
      if (!_this.data.gameAry[i][j].is_tap) {
        if (_this.data.gameAry[i][j].num == 9) {
          clearInterval(_this.data.timer)
          // _this.setData({stop: true})
          gameAry[i][j].type = 1
          
        } else {
          // 翻开 小方块
          // _this.setData({[tapObj]: !_this.data.gameAry[i][j].is_tap})
          let count = _this.count(i, j)
          if (count != 0) {
            gameAry[i][j].num = count
          } else {
            // gameAry[i][j].is_tap = !gameAry[i][j].is_tap

          }
        }
      }
    }
    _this.setData({gameAry: gameAry})
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
  },
  /**
   * 随机生成地雷坐标
  */
  randomMine () {
    let position, mineArr, is_repetition,len
    len = 1
    mineArr = new Array()
    for (let i = 0; i < len; i++) {

      position = this.randomNumber()

      if (mineArr.length) {
        is_repetition = false
        for (let j = 0; j < mineArr.length; j++) {
          if (mineArr[i] == position) {
            is_repetition = true
          }
        }
      } else {
        is_repetition = false
      }
      
      if (!is_repetition) {

        mineArr.push(position)

        if (len < 10) {
          len++
        } else {
          this.setData({mineArr: mineArr})
        }
      }
    }
  },
  /**
   * 生成随机数
  */
  randomNumber () {
    let x,y
    x = parseInt(Math.random(10) * 10)
    y = parseInt(Math.random(10) * 10)
    return [x,y]
  },
  /**
   * 放置地雷
  */
  mine () {
    let [gameAry, mineArr] = [this.data.gameAry, this.data.mineArr]

    for (let i = 0; i < mineArr.length; i++) {
      gameAry[mineArr[i][0]][mineArr[i][1]].num = 9
    }
    // console.log(gameAry)
    this.setData({gameAry: gameAry})
  },
  /**
   * 计算数字
  */
  count (x,y) {
    const _this = this
    let gameAry = _this.data.gameAry
    let number = 0
    console.log(gameAry[x + 1][y].num)
    if (gameAry[x + 1][y].num == 9) {
      number++
    }
    if (gameAry[x - 1][y].num == 9) {
      number++
    }
    if (gameAry[x][y + 1].num == 9) {
      number++
    }
    if (gameAry[x][y - 1].num == 9) {
      number++
    }
    if (gameAry[x + 1][y + 1].num == 9) {
      number++
    }
    if (gameAry[x + 1][y - 1].num == 9) {
      number++
    }
    if (gameAry[x - 1][y + 1].num == 9) {
      number++
    }
    if (gameAry[x - 1][y - 1].num == 9) {
      number++
    }
    console.log(number)
    if (!number) {
      gameAry[x][y].is_tap = true
      gameAry[x + 1][y].is_tap = true
      gameAry[x - 1][y].is_tap = true
      gameAry[x][y + 1].is_tap = true
      gameAry[x][y - 1].is_tap = true
      gameAry[x + 1][y + 1].is_tap = true
      gameAry[x + 1][y - 1].is_tap = true
      gameAry[x - 1][y + 1].is_tap = true
      gameAry[x - 1][y - 1].is_tap = true
      // _this.count()
    } else {

    }
    _this.setData({gameAry: gameAry})
    // console.log(number)
    return number
  }

})
// jc 0