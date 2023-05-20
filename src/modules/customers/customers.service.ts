import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { Customer, ICustomer } from "./entities/customer.entity";
import { CrudService } from "../../base/crud.base";

@Injectable()
export class CustomersService extends CrudService<Model<ICustomer>> {
  constructor(
    @Inject("CUSTOMER_MODEL")
    private customerModel: Model<ICustomer>
  ) {
    super(customerModel);
  }
}
