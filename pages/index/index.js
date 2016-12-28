Page({
  data: {
    height: 0,
    center: [113.324520,23.099994],
    markers: []
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e)
    let mark = {}
    this.data.markers.map((ele)=>{
      if(ele.id == e.markerId)
        mark = ele
    })
    wx.showModal({
  title: '厕所地址',
  content: mark.address+' ('+mark._distance.toFixed(0)+'m)',
  showCancel: false,
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    }
  }
})
  },
  onLoad() {
    const system = wx.getSystemInfoSync()
    this.setData({
      height: system.windowHeight
    })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          center: [res.longitude, res.latitude]
        })
        console.log(res.longitude, res.latitude)
        wx.request({
          url: 'https://api.getweapp.com/vendor/qqmap/search/toilet',
          data: {
            lat: res.latitude,
            lng: res.longitude,
            page: 1
          },
          success:(res)=>{
            res.data.data.map((e)=>{
              e.iconPath = "/images/matong.png"
              e.width = 50
              e.height = 50
              e.latitude = e.location.lat
              e.longitude = e.location.lng
            })
            this.setData({
              markers: res.data.data
            })
            console.log(res.data.data)
          }
        })
      }
    })
  }
})
