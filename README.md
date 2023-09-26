<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Task 2 High-Level System Architecture for Order Processing System:

                              Load Balancer
                                  |
                                  |
    +--------------+       +--------------+       +--------------+
    |              |       |              |       |              |
    | Web Server 1 |-------| Web Server 2 |-------| Web Server n |
    |              |       |              |       |              |
    +--------------+       +--------------+       +--------------+
                                  |
                                  |
                           API Gateway
                                  |
+------------+     +------------+  +------------+     +------------+
|            |     |            |  |            |     |            |
| Orders MS  |     | Meals MS   |  | Users MS   |     | Payment MS |
|            |     |            |  |            |     |            |
+------------+     +------------+  +------------+     +------------+
                                  |
                                  |
                              Databases
                                  |
                                  |
                        Caching (Redis Cluster)
                                  |
                                  |
                           Monitoring & Logs



### Explanation for Architectural Decisions:

- **Load Balancer:** To evenly distribute traffic to the web servers, ensuring no single server is overwhelmed.

- **Web Servers:** Multiple instances to handle incoming traffic. As traffic grows, we can scale horizontally by adding more instances.

- **API Gateway:** Serves as an entry point for APIs. It can handle request routing, composition, and rate limiting.

#### Microservices (MS):

- **Orders MS:** Handles order creation, status updates, and order processing.
  
- **Meals MS:** Manages meal information, including addons and other components.
  
- **Users MS:** Deals with user profiles, authentication, and other user-specific functionalities.
  
- **Payment MS:** Handles payment transactions securely.

- **Databases:** Use of distributed databases such as Cassandra or sharded PostgreSQL to handle the massive volume of orders. Separate databases for each microservice to ensure they are decoupled.

- **Real-time updates:** Using event-driven architecture. Once an order is updated in the "Orders MS", an event is published to a message broker (like Kafka or RabbitMQ) which other services listen to and take appropriate action.

- **Caching (Redis Cluster):** Cache frequently accessed data to reduce database load. Redis is distributed and can handle high throughput.

- **Monitoring & Logs:** Use monitoring tools like Prometheus and Grafana to monitor the system. Logs are sent to centralized logging systems like ELK Stack.

### Security:

- Use HTTPS for secure data transmission.
  
- Store payment data in PCI DSS compliant storage. Never store full card details; only use tokens.
  
- Personal user data should be encrypted both at rest and in transit.
  
- Implement proper authentication (like JWT) and authorization mechanisms for APIs.

### Resilience and Availability:

- Use container orchestration platforms like Kubernetes to ensure if any service goes down, it's immediately brought back up.

- Database replication to ensure data is backed up in multiple places.


