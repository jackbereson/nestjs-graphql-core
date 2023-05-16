import { Model, Types } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { ICustomer } from './entities/customer.entity';
import { CrudService } from 'src/base/crud.base';

@Injectable()
export class CustomersService extends CrudService {

  constructor(
    @Inject('CUSTOMER_MODEL')
    private customerModel: Model<ICustomer>
  ) {
    super(customerModel);
  }


  callSample() {

  }
}
