import { Subject } from "rxjs";
import { ICustomer } from "../modules/customers/entities/customer.entity";

export const OnCustomerInfoChanging = new Subject<ICustomer>();

OnCustomerInfoChanging.subscribe(async (payload) => {});
