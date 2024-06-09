import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb://localhost:27017/order-system', // 替换为你的 MongoDB URL 和数据库名称
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export class MongoDataSource extends juggler.DataSource {
  static dataSourceName = 'mongodb';
  constructor() {
    super(config);
  }
}
