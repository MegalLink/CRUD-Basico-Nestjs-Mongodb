import {Document} from 'mongoose'
export interface ProductoInterfaz extends Document{
    readonly name:string;
    readonly descripcion:string;
    readonly imageUrl:string;
    readonly precio:number;
    readonly fechaCreacion:Date;
    }