import {Schema} from 'mongoose';

export const ProductoSchema = new Schema({
     name:{type:String, required:true},
     descripcion:String,
     imageUrl:String,
     precio:Number,
     fechaCreacion:{
         type:Date,
         default: Date.now
     },
});