import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 3333,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};

if (!env.jwtSecret) {
  throw new Error('A variável de ambiente JWT_SECRET não foi definida');
}
