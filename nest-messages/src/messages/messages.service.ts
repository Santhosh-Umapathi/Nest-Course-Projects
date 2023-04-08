import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

// Service to talk with Repository
@Injectable() // Can be injected into other services
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository) {}

  findAll() {
    return this.messagesRepository.findAll();
  }

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  create(text: string) {
    return this.messagesRepository.create(text);
  }
}
