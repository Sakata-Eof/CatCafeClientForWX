
Page({
  data: {
    products: [], // 用于存储从服务器获取的商品数据
    cart: [], //购物车数组
    cartOpen: false
  },

  viewCart: function () {
    wx.navigateTo({
      url: "/pages/checkout/checkout",
    });
  },

  onShow() {
    if(wx.getStorageSync('token')){
      this.fetchProducts(); // 页面展示时获取商品数据
    }
    else{
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
  fetchProducts() {
    wx.showLoading({
      title: '加载中...'
    });
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
          wx.hideLoading();
        }
        else{
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
          });
        }
      },
      fail:()=>{
        wx.hideLoading();
        wx.showToast({
          title: '网络错误',
          icon:'error'
        });
      }
    });
    
  },
  // 其他页面逻辑，如点击商品跳转到详情页等，可以在这里添加
  // 将产品添加到购物车的方法
  addToCart: function (event) {
    const productId = event.currentTarget.dataset.productid;
    console.log('Event Current Target Dataset:', event.currentTarget.dataset);
    const price = event.currentTarget.dataset.price;
    const products = this.data.products;
    let cart = this.data.cart;
    console.log('Products:', products);
    console.log('Cart:', cart);
    // 查找要添加的产品
    const productToAdd = products.find(product => product.productID === productId);

    console.log('Product to Add:', productToAdd);

    // 检查产品是否已经在购物车中
    const cartItem = this.data.cart.find(item => item.productID === productId);
    console.log(cartItem);
    console.log(this.data.cart);
    if (this.data.cart.length === 0) {
      //购物车里还没有商品
      cart.push({
        ...productToAdd,
      });
      this.setData({
        cart: cart
      });
      wx.showToast({
        title: '已添加到购物车',
        icon: 'success'
      });
    } else {
      if (!cartItem) {
        wx.showToast({
          title: '非同类商品',
          icon: 'none'
        });
      } else {
        cart.push({
          ...productToAdd,
        });
        this.setData({
          cart: cart
        });
        wx.showToast({
          title: '已添加到购物车',
          icon: 'success'
        });

      }
    }

    wx.setStorageSync('cartData', this.data.cart);
    console.log('Updated Cart:', this.data.cart);

    this.setData({
      cartOpen: false
    });
  },
  // 查看或打开购物车栏的方法
  toggleCart: function () {
    this.setData({
      cartOpen: !this.data.cartOpen
    });
  },
  // 辅助函数：从事件对象中提取产品信息
  getProductDataFromEvent: function (event) {
    const {
      currentTarget: {
        dataset
      }
    } = event;
    return {
      productId: dataset.productid,
      productName: dataset.productName,
      price: parseFloat(dataset.price),
    };
  },
  // 计算购物车总价的方法
  calculateCartTotal: function () {
    return this.data.cart.reduce((total, item) => total + item.price, 0);
  },

});