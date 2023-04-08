import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

// Logics related to the database

@Injectable() //Can be injected into other services
export class MessagesRepository {
  async findAll() {
    const contents = await readFile('database.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async findOne(id: string) {
    const contents = await readFile('database.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async create(message: string) {
    const contents = await readFile('database.json', 'utf-8');
    const messages = JSON.parse(contents);
    const id = Math.floor(Math.random() * 1000);
    messages[id] = { id, message };
    await writeFile('database.json', JSON.stringify(messages));
    return messages[id];
  }
}
