export function sanitizarUsuario(usuario) {
  const { senhaHash, ...restante } = usuario;
  return restante;
}
