---
to: ../src/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.service.ts
---
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../../base/crud.base';
import { <%= h.inflection.camelize(name) %> , I<%= h.inflection.camelize(name) %> } from './entities/<%= h.inflection.camelize(name, true) %>.entity';

@Injectable()
export class <%= h.inflection.camelize(name) %>Service extends CrudService<Model<I<%= h.inflection.camelize(name) %>>> {

  constructor(
    @Inject('<%= h.changeCase.upper(name) %>_MODEL')
    private <%= h.inflection.camelize(name, true) %>Model: Model<I<%= h.inflection.camelize(name) %>>
  ) {
    super(<%= h.inflection.camelize(name, true) %>Model);
  }
}
