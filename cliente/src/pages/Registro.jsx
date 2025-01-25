import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Registrar() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigate();

  const registrar = async (event) => {
    event.preventDefault();

    if (!nome || !email) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });

      if (resposta.ok) {
        alert("Usuário registrado com sucesso!");
        navigation('/');
      } else {
        const errorData = await resposta.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Erro ao registrar: ${error.message}`);
    }
  };

  return (
    <main>
      <form onSubmit={registrar}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </main>
  );
}
