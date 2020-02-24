import mongoose from 'mongoose'
const Schema = mongoose.Schema
const PoiSchema = new Schema({
  name: {
    type: String //景点名称
  },
  province: {
    type: String //省份
  },
  city: {
    type: String //城市
  },
  county: {
    type: String //县
  },
  areaCode: {
    type: String //区域编码
  },
  tel: {
    type: String //电话
  },
  area: {
    type: String //商圈
  },
  addr: {
    type: String //地址
  },
  type: {
    type: String
  },
  module: {
    type: String
  },
  longitude: {
    type: Number //经度 用来使用地图API
  },
  latitude: {
    type: Number //纬度
  }
})

export default mongoose.model('Poi',PoiSchema)