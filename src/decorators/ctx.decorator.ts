import { ExecutionContext, Inject, Injectable, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Context } from "../auth/context";

export const Ctx = createParamDecorator(
    async (_, context: ExecutionContext) => {
        return GqlExecutionContext.create(context).getContext();
    },
)