import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export enum ROLES {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
}

export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);