import { Category } from "./category";

export class Product {
constructor(
    public id:number,
    public  name :string,
    public categoryId :number,
    public description :string,
    public price: number,
    public imageSrc :string  ,
    public stockQuantity :number,
    public category:Category
){}
    // public string ImageSrc { get; set; } 
}
