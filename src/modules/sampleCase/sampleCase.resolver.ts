import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SampleCaseService } from './sampleCase.service';
import { SampleCase, SampleCasePageData } from './entities/sampleCase.entity';
import { CreateSampleCaseInput } from './dto/create-sample-case.input';
import { UpdateSampleCaseInput } from './dto/update-sample-case.input';
import { QueryGetListInput } from '../../base/input.base';
import { ROLES, Roles } from '../../decorators/roles.decorator';
import { Ctx } from '../../decorators/ctx.decorator';
import { Context } from '../../auth/context';

@Resolver(() => SampleCase)
export class SampleCaseResolver {
  constructor(private readonly sampleCaseService: SampleCaseService) { }

  @Query(() => SampleCasePageData)
  async getAllSampleCase(@Args('q') args: QueryGetListInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.sampleCaseService.fetch(args);
  }

  @Query(() => SampleCase)
  getOneSampleCase(@Args('id', { type: () => ID }) id: string, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.sampleCaseService.findOne(id);
  }

  @Mutation(() => SampleCase)
  createSampleCase(@Args('createSampleCaseInput') args: CreateSampleCaseInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.sampleCaseService.create(args);
  }

  @Mutation(() => SampleCase)
  updateSampleCase(@Args('updateSampleCaseInput') args: UpdateSampleCaseInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.sampleCaseService.updateOne(args.id, args);
  }

  @Mutation(() => SampleCase)
  @Roles(ROLES.ADMIN)
  removeSampleCase(@Args('id', { type: () => ID }) id: string, @Ctx() context: Context) {
    return this.sampleCaseService.remove(id);
  }
}
