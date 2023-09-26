const config = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'macbook',
      password: null,
      database: 'test_db',
    },
    migrations: {
      directory: './src/migrations',
      extension: 'ts',
    },
  },
};

export default config;
