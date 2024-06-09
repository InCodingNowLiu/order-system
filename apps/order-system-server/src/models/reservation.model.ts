import {Entity, model, property} from '@loopback/repository';
import {Field, ObjectType} from 'type-graphql';
import {v4 as uuidv4} from 'uuid';

@ObjectType()
@model()
export class Reservation extends Entity {
  @Field()
  @property({
    type: 'string',
    id: true,
    generated: true,
    default: () => uuidv4(),
  })
  id: string;

  @Field()
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @Field()
  @property({
    type: 'string',
    required: true,
  })
  contactInfo: string;

  @Field()
  @property({
    type: 'date',
    required: true,
  })
  arrivalTime: Date;

  @Field()
  @property({
    type: 'number',
    required: true,
  })
  tableSize: number;

  @Field()
  @property({
    type: 'string',
    required: true,
    default: 'ordered',
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  _creatorId: string;

  @property({
    type: 'date',
    required: true,
  })
  created: Date;

  @property({
    type: 'date',
    required: true,
  })
  updated: Date;

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}
