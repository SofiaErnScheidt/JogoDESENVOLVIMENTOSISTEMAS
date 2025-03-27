const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')

let gravidade = 0.7
let gameOver = false
let maxPulos = 2
let pulos = 0
let pontuacao = 0
let melhorPontuacao = localStorage.getItem('melhorPontuacao') || 0

document.addEventListener('keypress', evento => {
    if (evento.code === 'Space' && !gameOver && pulos < maxPulos) {
        personagem.velocidade_y = -15
        pulos++
    }
})
    let personagem = {
        x: 100,
        y: canvas.height - 100,
        largura: 150, 
        altura: 150,  
        velocidade_y: 0,
        pulando: false,
        velocidade_x: 0,
        imagem: new Image()
    }
personagem.imagem.src= './imagem.jpg'

let obstaculo = {
    x: canvas.width,
    y: canvas.height - 100,
    largura: 50,
    altura: Math.random() * (150 - 50) + 50,
    velocidade_x: 5
}
function desenharPersonagem() {
    ctx.drawImage(
        personagem.imagem,
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem. altura )
}

function aumentarVelocidade() {
    if (!gameOver) {
        obstaculo.velocidade_x += 0.1
    }
}

setInterval(aumentarVelocidade, 1000)

function desenharObstaculo() {
    ctx.fillStyle = 'green'
    ctx.fillRect(obstaculo.x, canvas.height - obstaculo.altura, obstaculo.largura, obstaculo.altura)
}

function atualizarPersonagem() {
    if (!gameOver) {
        personagem.y += personagem.velocidade_y
        personagem.velocidade_y += gravidade

        if (personagem.y >= canvas.height - personagem.altura) {
            personagem.y = canvas.height - personagem.altura
            personagem.velocidade_y = 0
            pulos = 0
        }
    }
}

function atualizarObstaculo() {
    if (!gameOver) {
        obstaculo.x -= obstaculo.velocidade_x

        if (obstaculo.x + obstaculo.largura < 0) {
            obstaculo.x = canvas.width
            obstaculo.altura = Math.random() * (160 - 50) + 50
            pontuacao++
            if (pontuacao > melhorPontuacao) {
                melhorPontuacao = pontuacao
                localStorage.setItem('melhorPontuacao', melhorPontuacao)
            }
        }

        // Detecta colisão em qualquer parte do obstáculo (laterais ou topo)
        if (
            personagem.x < obstaculo.x + obstaculo.largura &&
            personagem.x + personagem.largura > obstaculo.x &&
            personagem.y < canvas.height &&
            personagem.y + personagem.altura > canvas.height - obstaculo.altura
        ) {
            gameOver = true
            setTimeout(reiniciarJogo, 3000) // Reinicia automaticamente após 3 segundos
        }
    }
}

function exibirPontuacao() {
    ctx.fillStyle = 'white'
    ctx.font = '20px Times New Roman'
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 30)
    ctx.fillText(`Melhor Pontuação: ${melhorPontuacao}`, 10, 60)
}

function exibirMensagemGameOver() {
    if (gameOver) {
        ctx.fillStyle = 'white'
        ctx.font = '50px Times New Roman'
        ctx.fillText('GAME OVER', canvas.width / 4, canvas.height / 2)
    }
}

function reiniciarJogo() {
    obstaculo.x = canvas.width
    personagem.x = 100
    personagem.y = canvas.height - personagem.altura
    personagem.velocidade_y = 0
    gameOver = false
    pontuacao = 0
    obstaculo.velocidade_x = 5
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenharPersonagem()
    desenharObstaculo()
    atualizarPersonagem()
    atualizarObstaculo()
    exibirPontuacao()
    exibirMensagemGameOver()
    requestAnimationFrame(loop)
}



loop()