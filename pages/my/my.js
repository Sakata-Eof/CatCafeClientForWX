// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userID:null,
      token:''
    },

    onShow() {
      this.getCurrentUser();
      console.log('token:'+this.data.token);
      console.log('userID:'+this.data.userID);
    },
    getCurrentUser:function(){
      this.setData({
        userID:wx.getStorageSync('userID'),
        token:wx.getStorageSync('token')
      });
    },
    login:function(){
      wx.navigateTo({
        url: '/pages/login/login',
      });
    },
    logout:function(){
      wx.setStorageSync('token', '');
      wx.setStorageSync('userID', 0);
      this.getCurrentUser();
    }
})