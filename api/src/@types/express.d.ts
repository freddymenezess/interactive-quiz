import { RoleType } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: RoleType;
      };

      cookies: {
        token?: string;
        [key: string]: string | undefined;
      };

      params: {
        id?: string;
        quizId?: string;
        sessionId?: string;
        questionId?: string;
        [key: string]: string | undefined;
      };

      /**
       * Tipagem global para o Body.
       * Usamos Partial para que nem todos os campos sejam obrigatórios em todas as rotas.
       */
      body: {
        // Auth / User
        name?: string;
        email?: string;
        password?: string;

        // Quiz
        title?: string;
        categoryId?: number;
        difficultyId?: number;
        active?: boolean;

        // Questions & Options
        text?: string;
        position?: number;
        options?: Array<{
          text: string;
          isCorrect: boolean;
        }>;

        // Session / Game
        quizId?: string;
        questionId?: string;
        optionId?: string;

        [key: string]: any; // Permite campos extras sem quebrar o TS
      };
    }
  }
}

export {};
