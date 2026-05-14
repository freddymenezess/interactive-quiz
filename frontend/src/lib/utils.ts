import type { MessageTypes } from '@types/messages.types';

export const errorMessages: Record<MessageTypes, string> = {
  INVALID_CREDENTIALS:
    'E-mail ou senha incorretos. Verifique seus dados e tente novamente.',
  UNAUTHORIZED: 'Você precisa estar autenticado para acessar este recurso.',
  FORBIDDEN: 'Você não tem permissão para realizar esta ação.',
  FORBIDDEN_ADMIN_ONLY: 'Esta ação é restrita a administradores.',
  AUTH_TOKEN_REQUIRED: 'Token de autenticação é obrigatório.',
  AUTH_INVALID_TOKEN: 'Token de autenticação inválido ou expirado.',
  AUTH_MISSING_TOKEN:
    'Token de autenticação não encontrado. Faça login novamente.',
  LOGOUT_SUCCESSFULLY: 'Você saiu da sua conta com sucesso.',
  LOGOUT_FAILED: 'Não foi possível encerrar a sessão. Tente novamente.',

  USER_NOT_FOUND: 'Usuário não encontrado.',
  USER_CREATED_SUCCESSFULLY: 'Conta criada com sucesso! Bem-vindo(a).',
  EMAIL_ALREADY_EXISTS:
    'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.',
  REGISTRATION_FAILED:
    'Não foi possível concluir o cadastro. Tente novamente mais tarde.',

  NAME_REQUIRED: 'O nome é obrigatório.',
  NAME_TOO_SHORT: 'O nome deve ter pelo menos 2 caracteres.',
  EMAIL_REQUIRED: 'O e-mail é obrigatório.',
  INVALID_EMAIL_FORMAT: 'Informe um endereço de e-mail válido.',
  PASSWORD_REQUIRED: 'A senha é obrigatória.',
  PASSWORD_TOO_SHORT: 'A senha deve ter pelo menos 8 caracteres.',
  PASSWORD_WEAK:
    'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.',

  QUIZ_NOT_FOUND: 'Quiz não encontrado.',
  QUIZ_ID_REQUIRED: 'O ID do quiz é obrigatório.',
  INVALID_QUIZ_ID: 'O ID do quiz informado é inválido.',
  INVALID_QUIZ_DATA:
    'Os dados do quiz são inválidos. Verifique as informações e tente novamente.',

  QUESTION_AND_OPTION_REQUIRED:
    'É necessário informar a questão e pelo menos uma opção de resposta.',
  INVALID_QUESTION_DATA: 'Os dados da questão são inválidos.',
  MUST_HAVE_ONE_CORRECT_OPTION:
    'A questão deve ter pelo menos uma opção marcada como correta.',
  CORRECT_OPTION_NOT_CREATED:
    'Não foi possível salvar a opção correta. Tente novamente.',

  SESSION_NOT_FOUND: 'Sessão não encontrada.',
  SESSION_ALREADY_COMPLETED:
    'Esta sessão já foi encerrada e não pode ser modificada.',
  INVALID_SESSION_ID: 'O ID de sessão informado é inválido.',

  INTERNAL_SERVER_ERROR: 'Ocorreu um erro interno. Tente novamente mais tarde.',
  MANY_REQUESTS:
    'Muitas tentativas em pouco tempo. Aguarde alguns instantes e tente novamente.',

  GENDER_REQUIRED: 'Seleciona o teu género',

  UNKNOWN_ERROR: 'Erro interno do servidor',
};

import maleAvatar from '@avatars/male.png';
import femaleAvatar from '@avatars/female.png';

export function getAvatar(gender: 'male' | 'female'): string {
  const pool = gender === 'female' ? femaleAvatar : maleAvatar;
  return pool; // Return the first avatar as a placeholder
}
