import mongoose, {Schema} from 'mongoose';


const categorySchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true
  }, 
  icon: {
    type: String,
    require: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})


categorySchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
})


const Category = mongoose.model('Category', categorySchema);


export default Category;
