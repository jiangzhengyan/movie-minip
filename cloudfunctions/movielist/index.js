// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise')

// 云函数入口函数
exports.main = async(event, context) => {
  // event.start=0;
  // event.count=10;
  const wxContext = cloud.getWXContext()

  return rp(`http://douban.uieee.com/v2/movie/top250?start=${event
  .start}&count=${event.count}`).then(res => {

console.log(res,'请求 ')
    return res;
  }).catch(err => {
    console.log(err, '失败')
  })
}