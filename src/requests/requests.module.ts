import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsGateway } from './requests.gateway';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [RequestsGateway, RequestsService],
})
export class RequestsModule {}
