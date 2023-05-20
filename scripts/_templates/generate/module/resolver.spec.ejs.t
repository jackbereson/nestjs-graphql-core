---
to: ../src/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.resolver.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing';
import { <%= h.inflection.camelize(name) %>Resolver } from './<%= h.inflection.camelize(name, true) %>.resolver';
import { <%= h.inflection.camelize(name) %>Service } from './<%= h.inflection.camelize(name, true) %>.service';

describe('<%= h.inflection.camelize(name) %>Resolver', () => {
  let resolver: <%= h.inflection.camelize(name) %>Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= h.inflection.camelize(name) %>Resolver, <%= h.inflection.camelize(name) %>Service],
    }).compile();

    resolver = module.get<<%= h.inflection.camelize(name) %>Resolver>(<%= h.inflection.camelize(name) %>Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
