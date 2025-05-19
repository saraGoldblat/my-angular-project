import { User } from "./user";

export class Order {

constructor(
  public  orderId :number,
  public  orderDate :Date,
  public  userId :number,
  public  totalAmount :DoubleRange,
  public  user :User
 
) {}
   
}
