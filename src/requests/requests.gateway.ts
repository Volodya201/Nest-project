import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets'
import { RequestsService } from './requests.service'
import { CreateRequestDto } from './dto/create-request.dto'
import { UpdateRequestDto } from './dto/update-request.dto'
import { Server, Socket } from 'socket.io'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateApplicationCommand } from 'src/applications/commands/CreateApplication.command'
import { SetCheckValueCommand } from 'src/applications/commands/SetCheckValue.command'


@WebSocketGateway({cors: {origin: true}})
export class RequestsGateway {
    constructor(
      private readonly QueryBus:QueryBus,
      private readonly CommandBus:CommandBus
    ) {}

    onModuleInit() {
      console.log("Inited")
    }

    @WebSocketServer()
    server: Server


    @SubscribeMessage("newWish")
    async getRequests(
      @MessageBody() wishData: {wish: string, userId: number},
      @ConnectedSocket() client: Socket,
    ) {
      try {
        console.log(wishData)

        await this.CommandBus.execute(new CreateApplicationCommand({wish: wishData.wish, user_id: wishData.userId}))
        
        client.emit("wishSent")

        this.server.to("admin").emit("newWishAlert")
      } catch (error) {
        this.server.emit("error", {message: JSON.stringify(error)})
      }
    }


    @SubscribeMessage("admin")
    async admin(
      @ConnectedSocket() client: Socket,
    ) {
      try {
        client.join("admin")
      } catch (error) {
        this.server.emit("error", {message: JSON.stringify(error)})
      }
    }

    @SubscribeMessage("checkApplication")
    async checkApplication(
      @ConnectedSocket() client: Socket,
      @MessageBody() id: number,
    ) {
      this.CommandBus.execute(new SetCheckValueCommand(id))
    }
}















// @WebSocketGateway()
// export class RequestsGateway {
//   constructor(private readonly requestsService: RequestsService) {}

//   @SubscribeMessage('createRequest')
//   create(@MessageBody() createRequestDto: CreateRequestDto) {
//     return this.requestsService.create(createRequestDto);
//   }

//   @SubscribeMessage('findAllRequests')
//   findAll() {
//     return this.requestsService.findAll();
//   }

//   @SubscribeMessage('findOneRequest')
//   findOne(@MessageBody() id: number) {
//     return this.requestsService.findOne(id);
//   }

//   @SubscribeMessage('updateRequest')
//   update(@MessageBody() updateRequestDto: UpdateRequestDto) {
//     return this.requestsService.update(updateRequestDto.id, updateRequestDto);
//   }

//   @SubscribeMessage('removeRequest')
//   remove(@MessageBody() id: number) {
//     return this.requestsService.remove(id);
//   }
// }
