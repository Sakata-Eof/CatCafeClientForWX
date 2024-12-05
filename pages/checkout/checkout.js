Page({
    data: {
        cartItems: [], // 用于存储从本地存储获取的购物车商品信息
        totalPrice: 0, // 用于存储计算后的总价
    },

    onLoad: function () {
        // 从本地存储中获取购物车数据
        const cartData = wx.getStorageSync('cartData');
        if (cartData) {
            // 更新页面的购物车商品信息
            this.setData({
                cartItems: cartData,
            });
            // 计算总价（这里假设每个商品都有一个price属性）
            const totalPrice = cartData.reduce((sum, item) => sum + item.price, 0);
            this.setData({
                totalPrice: totalPrice.toFixed(2), // 保留两位小数
            });
        }
    },

    submitOrder: function () {
        // 实现提交订单的逻辑
        // ...
        // 准备订单信息
        let userID = wx.getStorageSync('userID');
        console.log(this.data.cartItems[0].price);
        const orderInfo = {
            userID: userID, // 用户ID存储在本地存储中
            productID: this.data.cartItems[0].productID,
            productPrice: parseFloat(this.data.cartItems[0].price), // 将单价转换回浮点数发送
            productCount:this.data.cartItems.length,
            orderTime: new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8), 
        };
      const  jwt=wx.getStorageSync('token');
        // 发送POST请求到后端服务器
        wx.request({
            url: 'http://127.0.0.1:8080/orders', 
            
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+jwt
            },
            data: JSON.stringify(orderInfo),
            success: (res) => {
              console.log(res.data.code);
                if (res.statusCode === 200 && res.data.code===1) {
                    wx.showToast({
                        title: '订单已提交',
                        icon: 'success'
                    });
                }
                else{
                  wx.showToast({
                    title: '订单未提交',
                    icon: 'error'
                });
                }
            }
        });
    }
});