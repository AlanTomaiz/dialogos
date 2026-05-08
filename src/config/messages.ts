// User status
export const USER_DEACTIVATED_MESSAGE =
  'Você foi removido do projeto, caso não concorde com a decisão, entre em contato com a coordenação do projeto.';

// Auth — registration / login / session
export const AUTH_RA_ALREADY_REGISTERED = 'RA já cadastrado.';
export const AUTH_PROVIDE_IDENTIFIER = 'Informe o RA ou e-mail para entrar.';
export const AUTH_RA_NOT_FOUND = 'RA não encontrado.';
export const AUTH_INVALID_RA_REGISTRATION = 'Cadastro de RA inválido.';
export const AUTH_SIGN_IN_FAILED = 'Falha ao entrar.';
export const AUTH_REGISTER_FAILED = 'Falha ao criar conta.';
export const AUTH_SIGN_OUT_FAILED = 'Falha ao encerrar a sessão.';
export const AUTH_USER_NOT_FOUND = 'Usuário logado não encontrado.';
export const AUTH_DEACTIVATE_FAILED = 'Falha ao desativar a conta.';

// Firebase Auth friendly error messages
export const FIREBASE_CONFIG_NOT_FOUND =
  'Ocorreu um erro de configuração. Por favor, contate os administradores do aplicativo.';
export const FIREBASE_EMAIL_IN_USE = 'Este e-mail já está em uso.';
export const FIREBASE_INVALID_EMAIL = 'Informe um e-mail válido.';
export const FIREBASE_WEAK_PASSWORD =
  'A senha deve ter pelo menos 6 caracteres.';
export const FIREBASE_INVALID_CREDENTIAL = 'E-mail/RA ou senha inválidos.';
export const FIREBASE_TOO_MANY_REQUESTS =
  'Muitas tentativas. Tente novamente em instantes.';
export const FIREBASE_NETWORK_FAILED =
  'Falha de conexão. Verifique sua internet.';

// Login screen
export const LOGIN_PROVIDE_CREDENTIALS = 'Informe o RA ou e-mail e a senha.';
export const LOGIN_SUCCESS = 'Login realizado com sucesso.';

// Sign-up screen
export const SIGNUP_FILL_ALL_FIELDS = 'Preencha todos os campos.';
export const SIGNUP_SUCCESS = 'Conta criada com sucesso.';

// Events — general
export const EVENT_LOAD_FAILED = 'Falha ao carregar eventos do Firebase.';
export const EVENT_NOT_FOUND = 'Evento não encontrado.';
export const EVENT_USER_NOT_IDENTIFIED = 'Usuário logado não identificado.';
export const EVENT_ADMIN_ONLY_CREATE =
  'Apenas administradores podem criar eventos.';
export const EVENT_CREATED_SUCCESS = 'Evento criado com sucesso.';
export const EVENT_CREATE_FAILED = 'Falha ao criar evento no Firebase.';

// Events — QR Code
export const EVENT_ADMIN_ONLY_QR_CODE =
  'Apenas administradores podem apresentar o QR Code.';
export const EVENT_PRESENTER_ONLY_QR_CODE =
  'Somente administradores criadores do evento podem apresentar o QR Code.';
export const EVENT_CREATOR_ONLY_QR_CODE =
  'Somente o administrador criador do evento pode apresentar o QR Code.';
export const EVENT_QR_CODE_PERMISSION_DENIED =
  'Sem permissão para acessar ou atualizar o QR Code deste evento.';
export const EVENT_QR_CODE_LOAD_FAILED =
  'Falha ao carregar o QR Code do evento.';

// Check-in flow
export const CHECKIN_EVENT_NOT_FOUND = 'Evento para check-in não encontrado.';
export const CHECKIN_QR_WRONG_EVENT = 'QR Code pertence a outro evento.';
export const CHECKIN_PRESENCE_ALREADY = 'Presença já registrada.';
export const CHECKIN_PRESENCE_CONFIRMED = 'Presença confirmada!';
export const CHECKIN_QR_PROCESS_FAILED =
  'Falha ao processar o QR Code para check-in.';
export const CHECKIN_QR_READ_FAILED =
  'Falha ao processar a leitura do QR Code.';
export const CHECKIN_PERMISSION_DENIED =
  'Sem permissão para registrar presença neste evento.';

// Check-in validation
export const CHECKIN_VALIDATE_EVENT_INACTIVE =
  'Check-in indisponível: evento inativo.';
export const CHECKIN_VALIDATE_INVALID_DATE =
  'Check-in indisponível: data do evento inválida.';
export const CHECKIN_VALIDATE_OUTSIDE_DATE =
  'Check-in indisponível: evento válido apenas na data de criação.';
export const CHECKIN_VALIDATE_INVALID_TIME_WINDOW =
  'Check-in indisponível: janela de horário inválida.';
export const CHECKIN_VALIDATE_OUTSIDE_TIME_WINDOW =
  'Check-in indisponível: fora da janela de horário do evento.';

// QR Code signing / verification
export const QR_INVALID = 'QR Code inválido.';
export const QR_UNSUPPORTED_VERSION =
  'QR Code inválido ou versão não suportada.';
export const QR_EXPIRED = 'QR Code expirado.';
export const QR_INVALID_SIGNATURE = 'QR Code com assinatura inválida.';

// Event form validation
export const EVENT_FORM_FILL_REQUIRED =
  'Preencha título, descrição, horário e local.';
export const EVENT_FORM_INVALID_TIME_FORMAT =
  'Informe um horário válido no formato HH:MM.';
export const EVENT_FORM_END_AFTER_START =
  'O horário final deve ser maior que o inicial no mesmo dia.';
