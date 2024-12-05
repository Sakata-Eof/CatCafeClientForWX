module.exports=function (path){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: 'http://127.0.0.1:8080/' + path,
      success:resolve,
      fail:reject
    })
  })
}