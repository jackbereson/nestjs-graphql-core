
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES, ROLES_KEY } from '../../decorators/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenHelper } from '../../helpers/token.helper';
import _ from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);

        const contextData = ctx.getContext();
        // console.log('ctx.getContext', contextData.req)
        // console.log('token', parseToken(context))
        const user = parseToken(contextData);

        return requiredRoles.some((role) => user?.roles?.includes(role));
    }
}

const parseToken = (params: any) => {
    try {
        const { req } = params;
        // console.log('parseToken req', req)
        let token = null;
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJfaWQiOiI2MzJiMTdhOGRhMzFlNTM2ZGJhNjg5YjMiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE2ODQyNTQ3MjIsImV4cCI6MTY4NDM0MTEyMn0.gjeaIpgDfZ6M9M5ofwoB3ruJAtjwhbE9qfbK1rJ6Q_o";
        let tokenData = null

        // if (req) {
        //     token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
        // }

        console.log('token', token)

        tokenData = TokenHelper.decodeToken(token);
        console.log('tokenData', tokenData)

        return tokenData


    } catch (err) {
        console.log('err', err);
        // if (err instanceof TokenExpiredError) {
        //     this.isTokenExpired = true;
        // }
        return null;
    } finally {
        return null;
    }
}