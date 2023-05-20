import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { EventErrorService } from "./eventError.service";
import { EventError, EventErrorPageData } from "./entities/eventError.entity";
import { CreateEventErrorInput } from "./dto/create-eventError.input";
import { UpdateEventErrorInput } from "./dto/update-eventError.input";
import { QueryGetListInput } from "../../base/input.base";
import { ROLES, Roles } from "../../decorators/roles.decorator";
import { Ctx } from "../../decorators/ctx.decorator";
import { Context } from "../../auth/context";

@Resolver(() => EventError)
export class EventErrorResolver {
  constructor(private readonly eventErrorService: EventErrorService) {}

  @Query(() => EventErrorPageData)
  async getAllEventErrors(
    @Args("q") args: QueryGetListInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.eventErrorService.fetch(args);
  }

  @Query(() => EventError)
  getOneEventError(
    @Args("id", { type: () => ID }) id: string,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.eventErrorService.findById(id);
  }

  @Mutation(() => EventError)
  createEventError(
    @Args("createEventErrorInput") args: CreateEventErrorInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.eventErrorService.create(args);
  }

  @Mutation(() => EventError)
  updateEventError(
    @Args("updateEventErrorInput") args: UpdateEventErrorInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.eventErrorService.updateOne(args.id, args);
  }

  @Mutation(() => EventError)
  @Roles(ROLES.ADMIN)
  removeEventError(
    @Args("id", { type: () => ID }) id: string,
    @Ctx() context: Context
  ) {
    return this.eventErrorService.remove(id);
  }
}
