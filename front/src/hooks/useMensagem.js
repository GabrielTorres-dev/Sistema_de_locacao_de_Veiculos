import { useCallback, useEffect, useState } from 'react';

export function useMensagem(duracao = 6000) {
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    if (!mensagem) return undefined;
    const temporizador = setTimeout(() => setMensagem(null), duracao);
    return () => clearTimeout(temporizador);
  }, [mensagem, duracao]);

  const mostrarSucesso = useCallback((texto) => setMensagem({ tipo: 'sucesso', texto }), []);
  const mostrarErro = useCallback((texto) => setMensagem({ tipo: 'erro', texto }), []);
  const limpar = useCallback(() => setMensagem(null), []);

  return { mensagem, mostrarSucesso, mostrarErro, limpar };
}
