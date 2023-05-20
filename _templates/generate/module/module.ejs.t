---
to: src/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.module.ts
---
import { Module } from '@nestjs/common';
import { <%= h.inflection.camelize(name) %>Service } from './<%= h.inflection.camelize(name, true) %>.service';
import { <%= h.inflection.camelize(name) %>Resolver } from './<%= h.inflection.camelize(name, true) %>.resolver';
import { <%= h.inflection.camelize(name) %>Providers } from './<%= h.inflection.camelize(name, true) %>.model';

@Module({
    imports: [],
    providers: [
      <%= h.inflection.camelize(name) %>Resolver,
      <%= h.inflection.camelize(name) %>Service,
      ...<%= h.inflection.camelize(name) %>Providers,
    ],
  })
export class <%= h.inflection.camelize(name) %>Module {}