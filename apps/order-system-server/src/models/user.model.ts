import {Entity, model, property} from '@loopback/repository';
import {Field, ObjectType} from 'type-graphql';
import {v4 as uuidv4} from 'uuid';

@ObjectType()
@model()
export class User extends Entity {
  @Field()
  @property({
    type: 'string',
    id: true,
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
    index: {unique: true},
  })
  email: string;

  @Field()
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['guest', 'staff'],
    },
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string; // 仅在数据库模型中定义，不在GraphQL模型中暴露

  constructor(data?: Partial<User>) {
    super(data);
  }
}
