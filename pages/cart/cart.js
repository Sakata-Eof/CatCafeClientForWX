Page({
    data: {
      cartItems: [], // 购物车商品列表，这里应该从服务器或本地存储获取
      totalPrice: 0  // 总价
    },
  
    onLoad: function () {
      // 从本地存储或服务器获取购物车商品列表
      // 假设这里已经从本地存储获取到了数据
      const cartItems = wx.getStorageSync('cartItems') || [];
      this.setData({
        cartItems: cartItems,
        totalPrice: this.calculateTotalPrice(cartItems)
      });
    },
  
    // 计算总价
    calculateTotalPrice: function (cartItems) {
      return cartItems.reduce((total, item) => total + item.price, 0);
    },
  
    // 去结算
    checkout: function () {
      // 跳转到结算页面，并传递购物车数据
      wx.showToast({
        title: '去结算',
        icon: 'success',
        duration: 2000,
        success: () => {
          wx.navigateTo({
            url: '/pages/checkout/checkout?cartItems=' + JSON.stringify(this.data.cartItems)
          });
        }
      });
    }
  });