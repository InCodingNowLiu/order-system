import {Resolver, Query, Arg, Mutation} from 'type-graphql';
import {service} from '@loopback/core';
import {ReservationRepository} from '../repositories';
import {Reservation} from '../models/index';
import {Ctx} from '@loopback/graphql';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(
    @service(ReservationRepository)
    public reservationRepository: ReservationRepository,
  ) {}

  @Query(() => [Reservation])
  async reservations(
    @Arg('status', {nullable: true}) status: string,
    @Arg('date', {nullable: true}) date: string,
  ): Promise<Reservation[]> {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (date) {
      filter.arrivalTime = {like: `${date}%`};
    }
    return this.reservationRepository.find({where: filter});
  }

  @Query(() => [Reservation])
  async queryReservationById(
    @Arg('id', {nullable: false}) id: string,
    @Ctx() context: any,
  ): Promise<Reservation> {
    const user = context.user;
    const filter: any = {
      id,
    };
    if (user.role !== 'staff') {
      filter._creatorId = user.id;
    }
    const record = await this.reservationRepository.findOne({
      where: filter,
    });
    if (!record)
      throw new Error("'You are not authorized to view this reservation.'");
    return record;
  }

  @Mutation(() => Reservation)
  async createReservation(
    @Arg('name') name: string,
    @Arg('contactInfo') contactInfo: string,
    @Arg('arrivalTime') arrivalTime: string,
    @Arg('tableSize') tableSize: number,
  ): Promise<Reservation> {
    return this.reservationRepository.create({
      name,
      contactInfo,
      arrivalTime: new Date(arrivalTime),
      tableSize,
      status,
    });
  }

  @Mutation(() => Reservation)
  async updateReservation(
    @Arg('id') id: string,
    @Arg('name', {nullable: true}) name: string,
    @Arg('contactInfo', {nullable: true}) contactInfo: string,
    @Arg('arrivalTime', {nullable: true}) arrivalTime: string,
    @Arg('tableSize', {nullable: true}) tableSize: number,
    @Arg('status', {nullable: true}) status: string,
    @Ctx() context: any,
  ): Promise<Reservation> {
    const user = context.user;
    const updateData: any = {};

    if (user.role !== 'staff') {
      const record = await this.reservationRepository.findOne({
        where: {id, _creatorId: user.id},
      });
      if (!record)
        throw new Error(
          'You are not authorized to update or delete this reservation.',
        );
      if (status) updateData.status = status;
    }

    if (name) updateData.name = name;
    if (contactInfo) updateData.contactInfo = contactInfo;
    if (arrivalTime) updateData.arrivalTime = new Date(arrivalTime);
    if (tableSize) updateData.tableSize = tableSize;

    await this.reservationRepository.updateById(id, updateData);
    return this.reservationRepository.findById(id);
  }

  @Mutation(() => Boolean)
  async deleteReservation(
    @Arg('id') id: string,
    @Ctx() context: any,
  ): Promise<boolean> {
    const user = context.user;
    if (user.role !== 'staff') {
      const record = await this.reservationRepository.findOne({
        where: {id, _creatorId: user.id},
      });
      if (!record)
        throw new Error(
          'You are not authorized to update or delete this reservation.',
        );
    }
    const record = await this.reservationRepository.findOne({
      where: {
        _creatorId: user.id,
        id,
      },
    });
    if (!record) {
      throw new Error(
        'You are not authorized to update or delete this reservation.',
      );
    }
    await this.reservationRepository.deleteById(id);
    return true;
  }

  private checkRole(context: any, ...roles: string[]) {
    const user = context.user;
    if (!user || !roles.includes(user.role)) {
      throw new Error('Unauthorized');
    }
  }
}
