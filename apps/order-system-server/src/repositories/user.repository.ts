import {DefaultCrudRepository} from '@loopback/repository';
import {User} from '../models/index';
import {MongoDataSource} from '../datasources/index';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(@inject('datasources.mongodb') dataSource: MongoDataSource) {
    super(User, dataSource);
  }
}
