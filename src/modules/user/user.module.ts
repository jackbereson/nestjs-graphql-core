import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../databases/maindb/database.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserProviders } from './user.model';

@Module({
    imports: [DatabaseModule],
    providers: [
      UserResolver,
      UserService,
      ...UserProviders,
    ],
  })
export class UserModule {}