import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Alterar() {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [carregando, setCarregando] = useState(true);
    const navigation = useNavigate();

    useEffect(() => {
        const busca = async () => {
            try {
                const resposta = await fetch('http://localhost:3000/usuarios/' + id);
                if (!resposta.ok) {
                    throw new Error("Usuário não encontrado");
                }
                const dados = await resposta.json();
                setNome(dados.nome);
                setEmail(dados.email);
            } catch (error) {
                alert("Erro ao buscar os dados do usuário: " + error.message);
            } finally {
                setCarregando(false);
            }
        };
        busca();
    }, [id]);

    const alterar = async (event) => {
        event.preventDefault();
        if (!nome.trim() || !email.trim()) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        try {
            await fetch('http://localhost:3000/usuarios/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({ nome, email }),
            });
            navigation('/');
        } catch {
            alert('Erro ao alterar');
        }
    };

    if (carregando) return <p>Carregando...</p>;

    return (
        <form
            onSubmit={alterar}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}
        >
            <input
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Digite o nome"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="Digite o e-mail"
                required
            />
            <button
                type="submit"
                style={{ padding: '0.5rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
                Alterar
            </button>
        </form>
    );
}
