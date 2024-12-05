// login.js
import weappJwt from './weapp-jwt.js'
Page({
  data: {},

  handleLogin: function (e) {
    const {
      userEmail,
      userPassword
    } = e.detail.value;
    // 这里进行登录逻辑处理
    wx.showLoading({
      title: '登录中...'
    });
    if (userEmail && userPassword) {
      wx.request({
        url: 'http://127.0.0.1:8080/login',

        method: 'POST',
        data: {
          'userEmail': userEmail,
          'userPassword': userPassword
        },

        success: (loginRes) => {
          wx.hideLoading();
          if (loginRes.data.code) {
            // 登录成功，保存用户信息到本地或进行页面跳转
            wx.setStorageSync('token', loginRes.data.data);
            let token = loginRes.data.data;
            let userID = weappJwt(token).sub;
            //本地保存userID
            wx.setStorageSync('userID', userID);
            wx.switchTab({
              url: '/pages/index/index'
            }); // 跳转到首页
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
          } else {
            wx.showToast({
              title: loginRes.data.msg,
              icon: 'none'
            });
          }
        },
        fail: () => {
          wx.hideLoading();
          wx.showToast({
            title: '网络错误',
            icon: 'error'
          });
        }
      });
    } else {
      wx.showToast({
        title: '请输入邮箱密码',
        icon: 'error'
      });
    }
  },

  navigateToRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register'
    }); // 跳转到注册
  }
});