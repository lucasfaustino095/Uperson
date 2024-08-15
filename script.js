// Função para calcular os resultados com base nas respostas do formulário
function calculateResults() {
    const form = document.getElementById('personalityForm'); // Obtém o formulário pelo ID

    // Define o número de perguntas por traço de personalidade
    const questionsPerTrait = {
        extroversao: 5,
        introversao: 5,
        amabilidade: 5,
        conscienciosidade: 5,
        neuroticismo: 5
    };

    // Calcula a pontuação máxima possível para cada traço
    const maxScorePerTrait = 5 * questionsPerTrait.extroversao;

    // Inicializa um objeto para armazenar as pontuações
    const scores = {
        extroversao: 0,
        introversao: 0,
        amabilidade: 0,
        conscienciosidade: 0,
        neuroticismo: 0
    };

    // Itera sobre cada traço
    for (const trait in questionsPerTrait) {
        // Itera sobre as perguntas para o traço atual
        for (let i = 1; i <= questionsPerTrait[trait]; i++) {
            // Obtém o valor da resposta da pergunta atual
            const value = parseInt(document.getElementById(`q${((Object.keys(questionsPerTrait).indexOf(trait) * 5) + i)}`).value);
            // Se o valor for um número válido, adiciona à pontuação
            if (!isNaN(value)) {
                scores[trait] += value;
            }
        }
    }

    // Obtém a div onde os resultados serão exibidos
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Calcula a porcentagem para cada traço e exibe os resultados
    let resultsText = '';
    for (const trait in scores) {
        const percentage = (scores[trait] / (questionsPerTrait[trait] * 5)) * 100;
        const resultText = `<p><strong>${capitalizeFirstLetter(trait)}:</strong> ${percentage.toFixed(2)}%</p>`;
        resultsDiv.innerHTML += resultText;
        resultsText += capitalizeFirstLetter(trait) + ': ' + percentage.toFixed(2) + '%\n';
    }

    // Adiciona a opção de download do PDF
    const pdfButton = document.createElement('button');
    pdfButton.textContent = 'Baixar PDF';
    pdfButton.addEventListener('click', () => downloadPDF(resultsText));
    resultsDiv.appendChild(pdfButton);

   
}

// Função para gerar e baixar o PDF
function downloadPDF(resultsText) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Resultados do Teste de Personalidade', 10, 10);
    doc.text(resultsText, 10, 20);

    doc.save('resultado_teste_personalidade.pdf');
}



// Função auxiliar para capitalizar a primeira letra de uma string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
