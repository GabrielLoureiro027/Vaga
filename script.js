// Dados fictícios para eventos com informações adicionais
const eventos = [
    { id: 0, nome: "Evento 1", local: "Teatro Municipal", hora: "19:00", tipo: "Show de Música" },
    { id: 1, nome: "Evento 2", local: "Arena Paulista", hora: "20:30", tipo: "Teatro" },
    { id: 2, nome: "Evento 3", local: "Estádio Nacional", hora: "18:00", tipo: "Festival" }
];

const participantes = {}; // Estrutura para armazenar participantes por evento

// Pega o ID do evento da URL (apenas para a página de participantes)
const params = new URLSearchParams(window.location.search);
const eventoId = parseInt(params.get('eventoId'));

// Função para exibir os eventos na página de eventos
function exibirEventos() {
    const eventosUl = document.getElementById('eventos');
    eventosUl.innerHTML = ''; // Limpa a lista antes de reexibir

    eventos.forEach((evento, index) => {
        const eventoLi = document.createElement('li');
        eventoLi.innerHTML = `
            <strong>${evento.nome}</strong><br>
            Local: ${evento.local}<br>
            Hora: ${evento.hora}<br>
            Tipo: ${evento.tipo}<br>
        `;
        eventosUl.appendChild(eventoLi);

        // Adiciona o botão "Ver Participantes" apenas para cada evento
        const botao = document.createElement('button');
        botao.innerText = "Ver Participantes";
        botao.onclick = () => window.location.href = `participantes.html?eventoId=${evento.id}`;
        eventosUl.appendChild(botao);
    });
}

// Função para exibir os participantes na página de participantes
function exibirParticipantes() {
    const participantesUl = document.getElementById('participantes');
    const tituloEvento = document.getElementById('tituloEvento');
    participantesUl.innerHTML = ''; // Limpa a lista antes de reexibir

    if (participantes[eventoId]) {
        tituloEvento.innerText = `Participantes de ${eventos[eventoId].nome}`;
        participantes[eventoId].forEach((participante, index) => {
            const participanteLi = document.createElement('li');
            participanteLi.innerHTML = `
                ${participante.nome} (${participante.email})
                <button onclick="removerParticipante(${index})">Excluir</button>
            `;
            participantesUl.appendChild(participanteLi);
        });
    } else {
        tituloEvento.innerText = `Não há participantes para ${eventos[eventoId].nome}`;
    }
}

// Função para adicionar um participante
document.getElementById('formParticipante')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Verifica se já existe uma lista de participantes para o evento
    if (!participantes[eventoId]) {
        participantes[eventoId] = []; // Se não existir, inicializa um novo array
    }
    
    // Adiciona o novo participante ao array correspondente
    participantes[eventoId].push({ nome, email });
    
    // Atualiza a exibição
    exibirParticipantes();
    
    // Limpa o formulário
    this.reset();
});

// Função para remover um participante
function removerParticipante(index) {
    participantes[eventoId].splice(index, 1); // Remove o participante da lista
    exibirParticipantes(); // Atualiza a exibição
}

// Chamada inicial para exibir eventos ao carregar a página
if (document.getElementById('eventos')) {
    exibirEventos();
} else {
    exibirParticipantes();
}
