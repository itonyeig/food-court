import { Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'objection';
import knex from 'knex';
import knexFile from '../knexfile';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private _knex: any;

  onModuleInit() {
    this._knex = knex(knexFile.development);
    Model.knex(this._knex);
  }

  getKnex() {
    return this._knex;
  }
}
