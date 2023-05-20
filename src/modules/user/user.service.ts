import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../../base/crud.base';
import { User , IUser } from './entities/user.entity';

@Injectable()
export class UserService extends CrudService<Model<IUser>> {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>
  ) {
    super(userModel);
  }
}
