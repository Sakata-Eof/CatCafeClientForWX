Page({
    data: {},
   
    handleRegister: function(e) {
      //const { userName, userPassword,userType,userEmail } = e.detail.value;
      const userName = e.detail.value.userName;
      const userPassword = e.detail.value.userPassword;
      const userEmail = e.detail.value.userEmail;
      // 这里进行注册逻辑处理，如调用后端API进行用户注册
      wx.showLoading({ title: '注册中...' });
      console.log("name:"+userName);
      console.log("email:"+userEmail);
      wx.request({
        url: 'http://127.0.0.1:8080/register', // 替换为你的服务器地址
        
        method: 'POST',
        data: {
            "userName":userName,
            "userPassword":userPassword,
            "registerTime":new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8),
            "userType":'false',
            "userSex":'true',
            "userEmail":userEmail
        },
        success: (res) => {
          wx.hideLoading();
          if (res.data.code) {
            wx.showToast({ title: '注册成功', icon: 'success' });
            wx.redirectTo({ url: '/pages/login/login' }); // 跳转到登陆页面
          } else {
            wx.showToast({ title: '注册失败', icon: 'none' });
          }
        },
        fail: () => {
          wx.hideLoading();
          wx.showToast({ title: '网络错误', icon: 'none' });
        }
      });
    }
  });