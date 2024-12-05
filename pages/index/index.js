const service=require('../../module/service.js');
Page({
    catcat:function()
    {
        wx.navigateTo({
            url:"/pages/catinfo/catinfo",
        });
    },
  onLoad(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    service('prdts').then((res)=>{
        console.log('从 prdts 接口获取的数据:', res.data); // 打印数据
      this.setData({
        indexmessage:res.data
      })
      setTimeout(() => {
        wx.hideLoading()
      }, 500)
    },()=>{
      console.log("失败")
      wx.hideLoading()
    })
  },
  onOrder:function(){
    wx.navigateTo({
      url: '../../pages/product-list/product-list',
    })
  }
})