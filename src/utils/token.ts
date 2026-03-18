export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const getTokenExpiry = (token: string) => {
  const payload = parseJwt(token);
  return payload?.exp ? payload.exp * 1000 : null;
};
