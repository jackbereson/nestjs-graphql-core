
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES, ROLES_KEY } from '../../decorators/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenHelper } from '../../helpers/token.helper';
import _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { Context } from '../../auth/context';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const contextData = GqlExecutionContext.create(context).getContext();

        // console.log('ctx.getContext', contextData.req)
        // console.log('token', parseToken(context))

        const ctx = new Context(contextData.req,this.jwtService);
        const user = ctx.tokenData;
        // return requiredRoles.some((role) => user?.roles?.includes(role));
        return requiredRoles.some((role) => user?.role === role);
    }
}