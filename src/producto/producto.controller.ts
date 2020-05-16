import { Controller, Get,Post,Put,Delete, Res,HttpStatus,Body,Param,NotFoundException, Query} from '@nestjs/common';
import { CrearProductoDto } from './models/producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
constructor(private productoSvc:ProductoService){

}
/*Header:
    Content-Type application/json
  Body:
 {
"name":"Gaming Mouse",
"descripcion":"Mouse sin sonido de click con 10 botones",
"imageUrl":"https://www.dhresource.com/0x0/f2/albu/g7/M01/69/D9/rBVaSVuroj2AGa7zAAT_yNmf0gg056.jpg",
"precio":90
}
*/
@Post('/crear') 
async createProducto(@Res() res, @Body() crearProductoDto:CrearProductoDto){
    await this.productoSvc.createProducto(crearProductoDto).then(producto=>{
        return res.status(HttpStatus.OK).json({ mensaje:'Producto creado satisfactoriamente', producto})
    })
    
}
//http://localhost:3000/producto/
@Get("/") 
async getProductos(@Res() res){
    await this.productoSvc.getProductos().then(productos=>{
        return res.status(HttpStatus.OK).json({mensaje:'Lista de productos',productos});
    })
    
}
//http://localhost:3000/producto/5ec06930adf50009e481b3b3
@Get("/:id") 
async getProducto(@Res() res, @Param('id') id:string){
     
    await this.productoSvc.getProducto(id).then(producto=>{
        return res.status(HttpStatus.OK).json({mensaje:'Producto',producto});
    }).catch((err)=>{
        throw new NotFoundException('No se encontro el producto',err);
    })
 
    
}
/*BORRAR CON CONSULTA es decir productoID se lo manda como variable
http://localhost:3000/producto/borrar?productoID=5ec06930adf50009e481b3b3
*/
@Delete('borrar')
async deleteProducto(@Res() res,@Query('productoID') productoID){
   await this.productoSvc.deleteProducto(productoID).then(producto=>{
       return res.status(HttpStatus.OK).json({mensaje:'Producto eliminado',producto})
   }).catch((err)=>{
    throw new NotFoundException('No se encontro el producto',err);
   })
}

/*http://localhost:3000/producto/update?productoID=5ec06792eceead28a8de0ceb
Header:
    Content-Type application/json
  Body:
 {
"name":"Gaming Mouse",
"descripcion":"Mouse sin sonido de click con 10 botones",
"imageUrl":"https://www.dhresource.com/0x0/f2/albu/g7/M01/69/D9/rBVaSVuroj2AGa7zAAT_yNmf0gg056.jpg",
"precio":90
}*/

@Put('/update')
async updateProduct(@Res() res,@Body() crearProductoDto:CrearProductoDto,@Query('productoID') productoID){
await this.productoSvc.updateProducto(productoID,crearProductoDto).then(producto=>{
    return res.status(HttpStatus.OK).json({mensaje:'Producto actualizado',producto});
}).catch((err)=>{
    throw new NotFoundException('No se encontro el producto',err);
   })


}

}
