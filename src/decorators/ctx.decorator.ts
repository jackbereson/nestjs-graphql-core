import { ExecutionContext, Inject, Injectable, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Context } from "../auth/context";

export const Ctx = createParamDecorator(
    async (_, exCtx: ExecutionContext) => {
        const exCtxData = GqlExecutionContext.create(exCtx).getContext();
        return new Context(exCtxData);
    },
)