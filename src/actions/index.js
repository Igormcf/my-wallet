// Coloque aqui suas actions
export const INFO_LOGIN = 'INFO_LOGIN';
export const INFO_WALLET = 'INFO_WALLET';

export const loginInfos = (payload) => ({
  type: INFO_LOGIN,
  payload,
});

export const walletInfos = (payload) => ({
  type: INFO_WALLET,
  payload,
});
