import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const userSchema = new Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  },
  role: { 
    type: String, 
    default: 'Admin' 
  },
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 }
});

const userModel = mongoose.model("User", userSchema);

export { userModel };