import { RoleType } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      // Propriedade injetada pelo seu Auth Middleware após verificar o JWT
      user?: {
        id: string;
        email: string;
        role: RoleType;
      };
      // Tipagem para os cookies (importante para o cookie-parser)
      cookies: {
        token?: string;
        [key: string]: string | undefined; // Permite outros cookies genéricos
      };
    }
  }
}