const config = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'macbook',
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME || 'test_db',
    },
    migrations: {
      directory: './src/migrations',
      extension: 'ts',
    },
  },
};

export default config;
