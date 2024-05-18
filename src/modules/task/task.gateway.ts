import {
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskEvents } from './task.events.enum';
import { Server } from 'socket.io';
import { Logger, OnModuleInit } from '@nestjs/common';
import { IGatewayPayload } from 'src/shared/interfaces/gateway.interface';

@WebSocketGateway()
export class TaskGateway implements OnModuleInit {
  private logger = new Logger(this.constructor.name);
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.debug(`${socket.id} Connected!`);
    });
  }

  @OnEvent(TaskEvents.CREATED)
  create(@MessageBody() newTask: IGatewayPayload) {
    const socketPayload: IGatewayPayload = {
      event: TaskEvents.CREATED,
      body: newTask,
      message: 'Task created!',
    };

    this.server.emit(TaskEvents.CREATED, socketPayload);
  }
}
