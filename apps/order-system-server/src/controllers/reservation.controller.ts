import {repository} from '@loopback/repository';
import {ReservationRepository} from '../repositories/index';

export class ReservationController {
  constructor(
    @repository(ReservationRepository)
    public reservationRepository: ReservationRepository,
  ) {}
}
