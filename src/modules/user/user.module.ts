import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { TokenHelper } from '../../auth/jwt.auth';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserProviders } from './user.model';

@Module({
    imports: [DatabaseModule],
    providers: [
      TokenHelper,
      UserResolver,
      UserService,
      ...UserProviders,
    ],
  })
export class UserModule {}