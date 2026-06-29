import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(createPrismaMock())
    .compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  return app;
}

function createPrismaMock() {
  const store: Record<string, any[]> = {
    user: [],
    subscription: [],
    patient: [],
    treatment: [],
    session: [],
    payment: [],
    appointment: [],
    userConsent: [],
    webhookEvent: [],
    enterpriseRequest: [],
    review: [],
  };

  let idCounter = 1;

  function generateId() {
    return `test-${idCounter++}`;
  }

  function matchesWhere(record: any, where: any): boolean {
    return Object.entries(where).every(([k, v]) => {
      if (v === null) return record[k] === null || record[k] === undefined;
      return record[k] === v;
    });
  }

  function createDelegate(tableName: string) {
    return {
      create: jest.fn(({ data }) => {
        const id = data.id || generateId();
        const record = {
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...data,
        };
        store[tableName].push(record);
        return Promise.resolve(record);
      }),
      findUnique: jest.fn(({ where }) => {
        const record = store[tableName].find((r) => matchesWhere(r, where));
        return Promise.resolve(record || null);
      }),
      findFirst: jest.fn(({ where }) => {
        const record = store[tableName].find((r) => matchesWhere(r, where));
        return Promise.resolve(record || null);
      }),
      findMany: jest.fn(({ where, include, orderBy } = {}) => {
        let records = [...store[tableName]];
        if (where) {
          records = records.filter((r) => matchesWhere(r, where));
        }
        return Promise.resolve(records);
      }),
      update: jest.fn(({ where, data }) => {
        const idx = store[tableName].findIndex((r) => matchesWhere(r, where));
        if (idx === -1) return Promise.reject(new Error('Not found'));
        store[tableName][idx] = { ...store[tableName][idx], ...data };
        return Promise.resolve(store[tableName][idx]);
      }),
      upsert: jest.fn(({ where, create, update }) => {
        const idx = store[tableName].findIndex((r) => matchesWhere(r, where));
        if (idx >= 0) {
          store[tableName][idx] = { ...store[tableName][idx], ...update };
          return Promise.resolve(store[tableName][idx]);
        }
        const id = generateId();
        const record = {
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...create,
        };
        store[tableName].push(record);
        return Promise.resolve(record);
      }),
      delete: jest.fn(({ where }) => {
        const idx = store[tableName].findIndex((r) => matchesWhere(r, where));
        if (idx >= 0) {
          const [removed] = store[tableName].splice(idx, 1);
          return Promise.resolve(removed);
        }
        return Promise.reject(new Error('Not found'));
      }),
      deleteMany: jest.fn(({ where } = {}) => {
        if (!where || Object.keys(where).length === 0) {
          const count = store[tableName].length;
          store[tableName] = [];
          return Promise.resolve({ count });
        }
        const before = store[tableName].length;
        store[tableName] = store[tableName].filter(
          (r) => !matchesWhere(r, where),
        );
        return Promise.resolve({ count: before - store[tableName].length });
      }),
      count: jest.fn(({ where } = {}) => {
        if (!where) return Promise.resolve(store[tableName].length);
        const records = store[tableName].filter((r) => matchesWhere(r, where));
        return Promise.resolve(records.length);
      }),
    };
  }

  const mock = {
    $transaction: jest.fn((fns: any[]) => {
      return Promise.all(fns.map((fn) => fn));
    }),
    user: createDelegate('user'),
    subscription: createDelegate('subscription'),
    patient: createDelegate('patient'),
    treatment: createDelegate('treatment'),
    session: createDelegate('session'),
    payment: createDelegate('payment'),
    appointment: createDelegate('appointment'),
    userConsent: createDelegate('userConsent'),
    webhookEvent: createDelegate('webhookEvent'),
    enterpriseRequest: createDelegate('enterpriseRequest'),
    review: createDelegate('review'),
  };

  return mock as any;
}
