// pages/my/my.js
var app = getApp();
var url_list = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  to_all_indent:function(event){
    wx.navigateTo({
      url: '../all_indent/all_indent'
    })
  },
  to_no_pay: function (event) {
    wx.navigateTo({
      url: '../no_pay/no_pay'
    })
  },
  to_no_indent: function (event) {
    wx.navigateTo({
      url: '../no_indent/no_indent'
    })
  },
  to_address: function (event) {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  to_service: function (event) {
    wx.navigateTo({
      url: '../service/service'
    })
  },
  to_favorite: function (event) {
    wx.navigateTo({
      url: '../favorite/favorite'
    })
  },
  to_red_bage: function (event) {
    wx.navigateTo({
      url: '../red_bage/red_bage'
    })
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          hasUserInfo: true,
          userInfo: res.data
        });
      }
    })
  },
  onShow: function (){
    wx.getStorage({
      key: 'userInfo',
      success: function (msg) {
        console.log(msg);
        that.setData({
          hasUserInfo: true,
          userInfo: msg.data
        });
      }
    })
  },
  getUserInfo: function (e) {
    var that = this;
    //授权，添加进数据库
    wx.login({
      success:function(res){
        wx.request({
          url: url_list.url_list.getUserInfo,
          method:'POST',
          data:{
            code:res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            e.detail.userInfo.user_id = res.data;
            wx.setStorage({
              key: 'userInfo',
              data: e.detail.userInfo
            });
            wx.getStorage({
              key: 'userInfo',
              success: function (msg) {
                console.log(msg);
                that.setData({
                  hasUserInfo: true,
                  userInfo: msg.data
                });
              }
            })
          }
        })
      }
    })
  }
})