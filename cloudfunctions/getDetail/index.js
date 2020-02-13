// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise')

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  return rp('https://douban.uieee.com/v2/movie/subject/'+event.movieid).then(res => {

console.log(res,'ok')
    return res;
  }).catch(err => {

  })
}