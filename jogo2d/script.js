const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')

const personagem = {
    x:100,
    y:350,
    largura:50,
    altura:50
}

function desenharPersonagem () {
    ctx.fillStyle = 'white'
     
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura )
}
function atualizarPersonagem (){
}

function loop () {
    ctx.clearRect (0, 0, canvas.width, canvas.height)
    desenharPersonagem() 
    atualizarPersonagem ()
    requestAnimationFrame (loop)
}

loop ()