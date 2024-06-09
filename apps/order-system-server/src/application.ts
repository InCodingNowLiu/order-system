import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {GraphQLBindings, GraphQLComponent} from '@loopback/graphql';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export {ApplicationConfig};

export class OrderSystemServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    this.component(GraphQLComponent);

    const server = this.getSync(GraphQLBindings.GRAPHQL_SERVER);
    // To register one or more middlewares as per https://typegraphql.com/docs/middlewares.html
    server.middleware((resolverData, next) => {
      // It's invoked for each field resolver, query and mutation operations
      return next();
    });

    this.expressMiddleware('middleware.express.GraphQL', server.expressApp);

    // It's possible to register a graphql context resolver
    this.bind(GraphQLBindings.GRAPHQL_CONTEXT_RESOLVER).to(context => {
      const authHeader = context.request.headers.authorization;
      let user = null;

      if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
          const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
          user = {id: decoded.userId, role: decoded.role};
        } catch (err) {
          console.error('JWT verification failed:', err);
        }
      }

      return {...context, user};
    });

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['graphql-resolvers'],
        extensions: ['.js'],
        nested: true,
      },
    };
  }
}
