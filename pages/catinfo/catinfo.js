Page({
  data: {
    cats: [],
  },

  //每次展示页面时刷新猫猫数据
  onShow: function () {
    if (wx.getStorageSync('token')) {
      this.fetchCats();
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 1500
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/my/my',
        });
      }, 1500);

    }
  },

  fetchCats: function () {
    const jwt = wx.getStorageSync('token');
    wx.request({
      url: 'http://127.0.0.1:8080/cats', // 替换为实际的API地址

      method: 'GET',
      header: {

        'Authorization': 'Bearer ' + jwt
      },

      success: (res) => {
        console.log(res.data.data);
        console.log(res.data.code);
        console.log(res.data.data[1].catImage);
        if (res.data.data && res.data.code === 1) {
          const newCats = res.data.data;

          this.setData({
            cats: [...this.data.cats, ...newCats],
          });
        } else {
          wx.showToast({
            title: res.data.msg,
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'error'
        });
      }
    });
  }
});