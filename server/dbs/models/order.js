import mongoose from 'mongoose'
const Schema = mongoose.Schema
const OrderShema = new Schema({
  id: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  imgs: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Order',OrderShema)