/**
 * Serviço para gerenciamento do token de autenticação no localStorage.
 *
 * Responsável por armazenar, recuperar e remover o token JWT de forma encapsulada.
 */
class TokenStorageServices {
  /**
   * Chave utilizada no localStorage para armazenar o token.
   * @private
   */
  private TOKEN_KEY = 'token'

  /**
   * Recupera o token salvo no localStorage.
   *
   * @returns O token salvo como `string`, ou `null` se não existir.
   */
  get(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  getname(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  /**
   * Salva o token no localStorage.
   *
   * @param token - O token JWT a ser salvo.
   */
  set(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  /**
   * Remove o token do localStorage.
   */
  remove(): void {
    localStorage.removeItem(this.TOKEN_KEY)
  }
}

/**
 * Instância única do serviço de token.
 *
 * Pode ser importada e usada diretamente nos hooks ou serviços.
 */
export const tokenStorageServices = new TokenStorageServices()
