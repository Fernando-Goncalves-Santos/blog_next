export const isRelativePathRegex = /^\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-fA-F]{2})*)*$/;

export const isUrlOrRelativePath = (val: string) => {
  const trimmed = val.trim();

  // Verifica se começa com "http://" ou "https://"
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      return true;
    } catch {
      return false;
    }
  }

  // Senão, testa se é um caminho relativo
  return isRelativePathRegex.test(trimmed);
};
