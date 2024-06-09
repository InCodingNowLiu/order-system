import {DefaultCrudRepository} from '@loopback/repository';
import {Reservation} from '../models/index';
import {MongoDataSource} from '../datasources/index';
import {inject} from '@loopback/core';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype.id
> {
  constructor(@inject('datasources.mongodb') dataSource: MongoDataSource) {
    super(Reservation, dataSource);
  }
}
