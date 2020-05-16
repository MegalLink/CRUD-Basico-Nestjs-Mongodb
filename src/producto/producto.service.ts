import { Injectable, Options } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductoInterfaz } from './models/producto.interface';
import { CrearProductoDto } from './models/producto.dto';

@Injectable()
export class ProductoService {
  
    constructor(@InjectModel('Producto') private productoModel:Model<ProductoInterfaz>){ }

    async getProductos():Promise<ProductoInterfaz[]>{
        return await this.productoModel.find()

    }
    async getProducto(idProducto:string):Promise<ProductoInterfaz>{
        return await this.productoModel.findById(idProducto);
    }
    async createProducto(crearProductoDto:CrearProductoDto):Promise<ProductoInterfaz>{
        //con el new creamos y con el save recien guardamos el producto
        return await new this.productoModel(crearProductoDto).save();

    }
    
    async deleteProducto(idProducto:string):Promise<ProductoInterfaz>{
       return await this.productoModel.findByIdAndDelete(idProducto)
    }

    async updateProducto(idProducto:string,crearProductoDto:CrearProductoDto):Promise<ProductoInterfaz>{
        //El objeto {new,true} es para que me retorne el nuevo producto , sino le pongo me va a estar retornando el anterior
        return await this.productoModel.findByIdAndUpdate(idProducto,crearProductoDto,{new:true});

    }
}
