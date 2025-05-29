import { User } from "./user";

export class Order {

constructor(
  public  orderId :number,
  public  orderDate :Date,
  public  userId :number,
  public totalAmount: number,
  public  user :User
 
) {}
   
}
