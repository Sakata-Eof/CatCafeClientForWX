// const { eventBridge } = require("XrFrame/kanata/lib/index");
const service = require('../../module/service.js');

Page({
  data: {
    orderList: [], // 用于存储从服务器获取的历史订单信息
    products: []
  },

  // onLoad: function () {
  //   // 从服务器获取历史订单数据
  //   this.fetchOrderHistory();
  // },
  onShow: function () {
    //每次显示该界面都刷新一次订单列表
    this.fetchOrderHistory();
  },
  
  payOrder: function (event) {
    this.fetchOrderHistory();

    console.log(event);
    console.log(event.currentTarget);
    console.log(event.currentTarget.dataset);
    console.log(event.currentTarget.dataset.id);
    const orderID = event.currentTarget.dataset.id;
    if (wx.getStorageSync('orderList').find(order => order.orderID === orderID)//检查当前订单是否已支付
    .orderPay) {
      wx.showToast({
        title: '订单已支付过',
        icon: 'success',
        duration: 1500
      });
    } else {
      const orderPay = true;
      const token = wx.getStorageSync('token');
      wx.request({ //获取order列表
        url: 'http://127.0.0.1:8080/order',

        method: 'PUT',
        header:{
          'Authorization':'Bearer '+token
        },
        data: {
          'orderID': orderID,
          'orderPay': orderPay
        },
        success: (res) => {
          wx.hideLoading();
          if (res.data.code) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1500
            });
            this.fetchOrderHistory();

          } else {
            wx.showToast({
              title: '支付失败',
              icon: 'error'
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
    }

  },

  fetchOrderHistory: function () {
    const token = wx.getStorageSync('token');
    wx.request({
      url: 'http://127.0.0.1:8080/prdts',
      method:'GET',
      header:{
        'Authorization':'Bearer '+token,
      },
      success:(res)=>{
        if(res.statusCode==200 && res.data.code){
          this.setData({
            products:res.data.data
          });
        }
        else{
          wx.showToast({
            title: res.data.msg,
          });
        }
      },
      fail:()=>{
        wx.showToast({
          title: '网络错误',
          icon:'error'
        });
      }
    });
    //获取当前userID
    const userID = wx.getStorageSync('userID');
    console.log('userID:'+userID);
    if (!userID) {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/my/my',
        });
      }, 1500);
      return;
    }
    let url = 'http://127.0.0.1:8080/orders/' + userID;

    wx.request({
      url: url,
      method: 'GET',
      data: {
        userID: userID
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 1) {
          this.setData({
            orderList: res.data.data
          });
          wx.setStorageSync('orderList', res.data.data);
          console.log(res.data.data);
        } else {
          wx.showToast({
            title: '获取订单失败',
            icon: 'error'
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
  },
});