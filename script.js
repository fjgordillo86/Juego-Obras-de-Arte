// --- REFERENCIAS A ELEMENTOS DEL DOM ---
const startScreen = document.getElementById('start-screen');
const nombreJugadorInput = document.getElementById('nombre-jugador');
const startBtn = document.getElementById('start-btn');
const numOptionBtns = document.querySelectorAll('.num-option-btn');
const modeOptionBtns = document.querySelectorAll('.mode-option-btn');
const countdownMessage = document.getElementById('countdown-message');
const showRankingBtn = document.getElementById('show-ranking-btn');
const rankingTitle = document.getElementById('ranking-title');
const rankingWinnersContainer = document.getElementById('ranking-winners');
const quizContainer = document.getElementById('quiz-container');
const titulo = document.getElementById('quiz-title'),
      imagenCuadro = document.getElementById('cuadro-img'),
      opcionesContainer = document.getElementById('opciones-container'),
      feedbackTexto = document.getElementById('feedback'),
      puntuacionTexto = document.getElementById('puntuacion'),
      siguienteBtn = document.getElementById('siguiente-btn'),
      finalizarBtn = document.getElementById('finalizar-btn'),
      endGameControls = document.getElementById('end-game-controls'),
      reiniciarBtn = document.getElementById('reiniciar-btn'),
      cerrarBtn = document.getElementById('cerrar-btn'),
      sonidoAcierto = document.getElementById('sonido-acierto'),
      sonidoFallo = document.getElementById('sonido-fallo'),
      sonidoStart = document.getElementById('sonido-start');

// --- BASE DE DATOS DE PREGUNTAS ---
// Asegúrate de que todas las imágenes y nombres de obras estén correctos.
const preguntas = [
    { imagen: 'img/la-noche-estrellada.jpg', nombreObra: 'La Noche Estrellada', opciones: ['Vincent van Gogh', 'Claude Monet', 'Paul Gauguin'], respuestaCorrecta: 'Vincent van Gogh' },
    { imagen: 'img/la-mona-lisa.jpg', nombreObra: 'La Mona Lisa', opciones: ['Leonardo da Vinci', 'Michelangelo', 'Raphael'], respuestaCorrecta: 'Leonardo da Vinci' },
    { imagen: 'img/el-grito.jpg', nombreObra: 'El Grito', opciones: ['Edvard Munch', 'Gustav Klimt', 'Egon Schiele'], respuestaCorrecta: 'Edvard Munch' },
    { imagen: 'img/la-joven-de-la-perla.jpg', nombreObra: 'La Joven de la Perla', opciones: ['Johannes Vermeer', 'Rembrandt', 'Frans Hals'], respuestaCorrecta: 'Johannes Vermeer' },
    { imagen: 'img/guernica.jpg', nombreObra: 'Guernica', opciones: ['Pablo Picasso', 'Salvador Dalí', 'Joan Miró'], respuestaCorrecta: 'Pablo Picasso' },
    { imagen: 'img/la-persistencia-de-la-memoria.jpg', nombreObra: 'La Persistencia de la Memoria', opciones: ['Salvador Dalí', 'René Magritte', 'Max Ernst'], respuestaCorrecta: 'Salvador Dalí' },
    { imagen: 'img/las-meninas.jpg', nombreObra: 'Las Meninas', opciones: ['Diego Velázquez', 'Francisco de Goya', 'El Greco'], respuestaCorrecta: 'Diego Velázquez' },
    { imagen: 'img/el-nacimiento-de-venus.jpg', nombreObra: 'El Nacimiento de Venus', opciones: ['Sandro Botticelli', 'Tiziano', 'Donatello'], respuestaCorrecta: 'Sandro Botticelli' },
    { imagen: 'img/la-ronda-de-noche.jpg', nombreObra: 'La Ronda de Noche', opciones: ['Rembrandt', 'Peter Paul Rubens', 'Anthony van Dyck'], respuestaCorrecta: 'Rembrandt' },
    { imagen: 'img/impresion-sol-naciente.jpg', nombreObra: 'Impresión, Sol Naciente', opciones: ['Claude Monet', 'Édouard Manet', 'Pierre-Auguste Renoir'], respuestaCorrecta: 'Claude Monet' },
    { imagen: 'img/el-beso.jpg', nombreObra: 'El Beso', opciones: ['Gustav Klimt', 'Egon Schiele', 'Oskar Kokoschka'], respuestaCorrecta: 'Gustav Klimt' },
    { imagen: 'img/gothico-americano.jpg', nombreObra: 'Gótico Americano', opciones: ['Grant Wood', 'Edward Hopper', 'Georgia O Keeffe'], respuestaCorrecta: 'Grant Wood' },
    { imagen: 'img/el-matrimonio-arnolfini.jpg', nombreObra: 'El Matrimonio Arnolfini', opciones: ['Jan van Eyck', 'Rogier van der Weyden', 'Hans Holbein'], respuestaCorrecta: 'Jan van Eyck' },
    { imagen: 'img/tarde-de-domingo-en-la-grande-jatte.jpg', nombreObra: 'Tarde de Domingo en la Isla de la Grande Jatte', opciones: ['Georges Seurat', 'Paul Signac', 'Camille Pissarro'], respuestaCorrecta: 'Georges Seurat' },
    { imagen: 'img/la-libertad-guiando-al-pueblo.jpg', nombreObra: 'La Libertad Guiando al Pueblo', opciones: ['Eugène Delacroix', 'Théodore Géricault', 'Jacques-Louis David'], respuestaCorrecta: 'Eugène Delacroix' },
    { imagen: 'img/el-tres-de-mayo.jpg', nombreObra: 'El Tres de Mayo de 1808', opciones: ['Francisco de Goya', 'Diego Velázquez', 'Jusepe de Ribera'], respuestaCorrecta: 'Francisco de Goya' },
    { imagen: 'img/el-caminante-sobre-el-mar-de-nubes.jpg', nombreObra: 'El Caminante sobre el Mar de Nubes', opciones: ['Caspar David Friedrich', 'J. M. W. Turner', 'John Constable'], respuestaCorrecta: 'Caspar David Friedrich' },
    { imagen: 'img/noctambulos.jpg', nombreObra: 'Noctámbulos', opciones: ['Edward Hopper', 'Grant Wood', 'Andrew Wyeth'], respuestaCorrecta: 'Edward Hopper' },
    { imagen: 'img/la-escuela-de-atenas.jpg', nombreObra: 'La Escuela de Atenas', opciones: ['Raphael', 'Leonardo da Vinci', 'Michelangelo'], respuestaCorrecta: 'Raphael' },
    { imagen: 'img/la-creacion-de-adan.jpg', nombreObra: 'La Creación de Adán', opciones: ['Michelangelo', 'Tiziano', 'Giorgione'], respuestaCorrecta: 'Michelangelo' },
    { imagen: 'img/nenufares.jpg', nombreObra: 'Nenúfares', opciones: ['Claude Monet', 'Edgar Degas', 'Berthe Morisot'], respuestaCorrecta: 'Claude Monet' },
    { imagen: 'img/almuerzo-sobre-la-hierba.jpg', nombreObra: 'Almuerzo sobre la Hierba', opciones: ['Édouard Manet', 'Gustave Courbet', 'Claude Monet'], respuestaCorrecta: 'Édouard Manet' },
    { imagen: 'img/baile-en-el-moulin-de-la-galette.jpg', nombreObra: 'Baile en el Moulin de la Galette', opciones: ['Pierre-Auguste Renoir', 'Alfred Sisley', 'Frédéric Bazille'], respuestaCorrecta: 'Pierre-Auguste Renoir' },
    { imagen: 'img/las-espigadoras.jpg', nombreObra: 'Las Espigadoras', opciones: ['Jean-François Millet', 'Camille Corot', 'Gustave Courbet'], respuestaCorrecta: 'Jean-François Millet' },
    { imagen: 'img/el-jardin-de-las-delicias.jpg', nombreObra: 'El Jardín de las Delicias', opciones: ['El Bosco', 'Pieter Bruegel el Viejo', 'Alberto Durero'], respuestaCorrecta: 'El Bosco' },
    { imagen: 'img/cazadores-en-la-nieve.jpg', nombreObra: 'Cazadores en la Nieve', opciones: ['Pieter Bruegel el Viejo', 'El Bosco', 'Hans Memling'], respuestaCorrecta: 'Pieter Bruegel el Viejo' },
    { imagen: 'img/el-columpio.jpg', nombreObra: 'El Columpio', opciones: ['Jean-Honoré Fragonard', 'Antoine Watteau', 'François Boucher'], respuestaCorrecta: 'Jean-Honoré Fragonard' },
    { imagen: 'img/saturno-devorando-a-su-hijo.jpg', nombreObra: 'Saturno Devorando a su Hijo', opciones: ['Francisco de Goya', 'Peter Paul Rubens', 'Caravaggio'], respuestaCorrecta: 'Francisco de Goya' },
    { imagen: 'img/la-gitana-dormida.jpg', nombreObra: 'La Gitana Dormida', opciones: ['Henri Rousseau', 'Paul Gauguin', 'Amedeo Modigliani'], respuestaCorrecta: 'Henri Rousseau' },
    { imagen: 'img/composicion-viii.jpg', nombreObra: 'Composición VIII', opciones: ['Wassily Kandinsky', 'Kazimir Malévich', 'Paul Klee'], respuestaCorrecta: 'Wassily Kandinsky' },
    { imagen: 'img/broadway-boogie-woogie.jpg', nombreObra: 'Broadway Boogie-Woogie', opciones: ['Piet Mondrian', 'Theo van Doesburg', 'Gerrit Rietveld'], respuestaCorrecta: 'Piet Mondrian' },
    { imagen: 'img/el-hijo-del-hombre.jpg', nombreObra: 'El Hijo del Hombre', opciones: ['René Magritte', 'Salvador Dalí', 'Giorgio de Chirico'], respuestaCorrecta: 'René Magritte' },
    { imagen: 'img/latas-de-sopa-campbell.jpg', nombreObra: 'Latas de Sopa Campbell', opciones: ['Andy Warhol', 'Roy Lichtenstein', 'Jasper Johns'], respuestaCorrecta: 'Andy Warhol' },
    { imagen: 'img/la-gran-ola-de-kanagawa.jpg', nombreObra: 'La Gran Ola de Kanagawa', opciones: ['Katsushika Hokusai', 'Utagawa Hiroshige', 'Kitagawa Utamaro'], respuestaCorrecta: 'Katsushika Hokusai' },
    { imagen: 'img/la-balsa-de-la-medusa.jpg', nombreObra: 'La Balsa de la Medusa', opciones: ['Théodore Géricault', 'Eugène Delacroix', 'Jean-Auguste-Dominique Ingres'], respuestaCorrecta: 'Théodore Géricault' },
    { imagen: 'img/la-muerte-de-marat.jpg', nombreObra: 'La Muerte de Marat', opciones: ['Jacques-Louis David', 'Jean-Léon Gérôme', 'Paul Delaroche'], respuestaCorrecta: 'Jacques-Louis David' },
    { imagen: 'img/los-jugadores-de-cartas.jpg', nombreObra: 'Los Jugadores de Cartas', opciones: ['Paul Cézanne', 'Édouard Manet', 'Gustave Caillebotte'], respuestaCorrecta: 'Paul Cézanne' },
    { imagen: 'img/la-danza.jpg', nombreObra: 'La Danza', opciones: ['Henri Matisse', 'André Derain', 'Raoul Dufy'], respuestaCorrecta: 'Henri Matisse' },
    { imagen: 'img/las-senoritas-de-avignon.jpg', nombreObra: 'Las Señoritas de Avignon', opciones: ['Pablo Picasso', 'Georges Braque', 'Juan Gris'], respuestaCorrecta: 'Pablo Picasso' },
    { imagen: 'img/la-traicion-de-las-imagenes.jpg', nombreObra: 'La Traición de las Imágenes', opciones: ['René Magritte', 'Marcel Duchamp', 'Man Ray'], respuestaCorrecta: 'René Magritte' },
    { imagen: 'img/baco.jpg', nombreObra: 'Baco', opciones: ['Caravaggio', 'Artemisia Gentileschi', 'Annibale Carracci'], respuestaCorrecta: 'Caravaggio' },
    { imagen: 'img/la-ultima-cena.jpg', nombreObra: 'La Última Cena', opciones: ['Leonardo da Vinci', 'Tintoretto', 'Paolo Veronese'], respuestaCorrecta: 'Leonardo da Vinci' },
    { imagen: 'img/la-primavera.jpg', nombreObra: 'La Primavera', opciones: ['Sandro Botticelli', 'Filippo Lippi', 'Piero della Francesca'], respuestaCorrecta: 'Sandro Botticelli' },
    { imagen: 'img/los-embajadores.jpg', nombreObra: 'Los Embajadores', opciones: ['Hans Holbein el Joven', 'Alberto Durero', 'Lucas Cranach el Viejo'], respuestaCorrecta: 'Hans Holbein el Joven' },
    { imagen: 'img/vista-de-toledo.jpg', nombreObra: 'Vista de Toledo', opciones: ['El Greco', 'Tiziano', 'Tintoretto'], respuestaCorrecta: 'El Greco' },
    { imagen: 'img/el-viejo-guitarrista.jpg', nombreObra: 'El Viejo Guitarrista Ciego', opciones: ['Pablo Picasso', 'Amedeo Modigliani', 'Chaim Soutine'], respuestaCorrecta: 'Pablo Picasso' },
    { imagen: 'img/la-madre-de-whistler.jpg', nombreObra: 'La Madre de Whistler', opciones: ['James McNeill Whistler', 'John Singer Sargent', 'Thomas Eakins'], respuestaCorrecta: 'James McNeill Whistler' },
    { imagen: 'img/en-el-moulin-rouge.jpg', nombreObra: 'En el Moulin Rouge', opciones: ['Henri de Toulouse-Lautrec', 'Edgar Degas', 'Édouard Manet'], respuestaCorrecta: 'Henri de Toulouse-Lautrec' },
    { imagen: 'img/el-bano.jpg', nombreObra: 'El Baño del Niño', opciones: ['Mary Cassatt', 'Berthe Morisot', 'Eva Gonzalès'], respuestaCorrecta: 'Mary Cassatt' },
    { imagen: 'img/el-temerario-remolcado.jpg', nombreObra: 'El Temerario Remolcado', opciones: ['J. M. W. Turner', 'John Constable', 'William Blake'], respuestaCorrecta: 'J. M. W. Turner' }
];

// --- ESTADO DEL JUEGO ---
const estadoJuego = {
    puntuacion: 0,
    preguntaActualIndex: 0,
    nombreJugador: '',
    preguntasDelJuegoActual: [],
    modoDeJuego: 'artista'
};

// --- LÓGICA DE RANKING ---
function guardarPuntuacion() {
    const LIMITE_RANKING = 5;
    const key = `ranking_${estadoJuego.modoDeJuego}`;
    const rankings = JSON.parse(localStorage.getItem(key)) || [];
    const nuevaPuntuacion = {
        nombre: estadoJuego.nombreJugador,
        puntuacion: estadoJuego.puntuacion
    };
    const indiceJugadorExistente = rankings.findIndex(r => r.nombre === nuevaPuntuacion.nombre);
    if (indiceJugadorExistente > -1) {
        if (nuevaPuntuacion.puntuacion > rankings[indiceJugadorExistente].puntuacion) {
            rankings[indiceJugadorExistente].puntuacion = nuevaPuntuacion.puntuacion;
        }
    } else {
        rankings.push(nuevaPuntuacion);
    }
    rankings.sort((a, b) => b.puntuacion - a.puntuacion);
    rankings.splice(LIMITE_RANKING);
    localStorage.setItem(key, JSON.stringify(rankings));
}

function mostrarRankings() {
    const medallas = ['🥇', '🥈', '🥉'];
    const modo = estadoJuego.modoDeJuego;
    const key = `ranking_${modo}`;
    rankingTitle.textContent = `Ranking - ${modo.charAt(0).toUpperCase() + modo.slice(1)}`;
    rankingWinnersContainer.innerHTML = '';
    const rankings = JSON.parse(localStorage.getItem(key)) || [];
    if (rankings.length === 0) {
        const p = document.createElement('p');
        p.textContent = '¡Sé el primero en jugar en este modo!';
        p.className = 'no-ranking-data';
        rankingWinnersContainer.appendChild(p);
    } else {
        rankings.slice(0, 3).forEach((r, index) => {
            const winnerCard = document.createElement('div');
            winnerCard.className = 'winner-card';
            const medalSpan = document.createElement('span');
            medalSpan.className = 'winner-medal';
            medalSpan.textContent = medallas[index];
            const infoSpan = document.createElement('span');
            infoSpan.className = 'winner-info';
            infoSpan.innerHTML = `${r.nombre}<br><strong>${r.puntuacion} pts</strong>`;
            winnerCard.appendChild(medalSpan);
            winnerCard.appendChild(infoSpan);
            rankingWinnersContainer.appendChild(winnerCard);
        });
    }
}

function mostrarRankingCompleto() {
    const modoSeleccionado = estadoJuego.modoDeJuego;
    const key = `ranking_${modoSeleccionado}`;
    const rankings = JSON.parse(localStorage.getItem(key)) || [];
    
    let mensaje = `Mejores Puntuaciones - ${modoSeleccionado.charAt(0).toUpperCase() + modoSeleccionado.slice(1)}\n\n`;

    if (rankings.length === 0) {
        mensaje += "Todavía no hay puntuaciones en este modo.";
    } else {
        rankings.forEach((r, index) => {
            mensaje += `${index + 1}. ${r.nombre} - ${r.puntuacion} pts\n`;
        });
    }
    alert(mensaje);
}

// --- LÓGICA DEL JUEGO ---
function handleModeSelection(e) {
    modeOptionBtns.forEach(btn => btn.classList.remove('selected'));
    const botonSeleccionado = e.target;
    botonSeleccionado.classList.add('selected');
    estadoJuego.modoDeJuego = botonSeleccionado.dataset.mode;
    mostrarRankings();
}
function handleNumSelection(e) {
    numOptionBtns.forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
}
function iniciarJuego() {
    estadoJuego.nombreJugador = nombreJugadorInput.value.trim();
    if (!estadoJuego.nombreJugador) {
        alert("Por favor, escribe tu nombre para comenzar."); return;
    }
    const selectedBtn = document.querySelector('.num-option-btn.selected');
    if (!selectedBtn) {
        alert("Por favor, selecciona un número de preguntas."); return;
    }
    startBtn.disabled = true;
    nombreJugadorInput.disabled = false; // Se habilita de nuevo por si el usuario quiere cambiarlo
    numOptionBtns.forEach(btn => btn.disabled = true);
    modeOptionBtns.forEach(btn => btn.disabled = true);
    showRankingBtn.disabled = true;
    sonidoStart.currentTime = 0;
    sonidoStart.play();
    let countdown = 3;
    countdownMessage.style.display = 'block';
    countdownMessage.textContent = `El juego comienza en ${countdown}...`;
    const timer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownMessage.textContent = `El juego comienza en ${countdown}...`;
        } else {
            countdownMessage.textContent = '¡Ya!';
            clearInterval(timer);
            setTimeout(comenzarPartida, 500);
        }
    }, 1000);
}
function comenzarPartida() {
    const numPreguntas = parseInt(document.querySelector('.num-option-btn.selected').textContent);
    barajarPreguntas(preguntas);
    estadoJuego.preguntasDelJuegoActual = preguntas.slice(0, numPreguntas);
    estadoJuego.puntuacion = 0;
    estadoJuego.preguntaActualIndex = 0;
    puntuacionTexto.textContent = `Puntuación: ${estadoJuego.puntuacion}`;
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    mostrarPregunta();
}
function reiniciarJuego() {
    quizContainer.style.display = 'none';
    startScreen.style.display = 'block';
    countdownMessage.style.display = 'none';
    countdownMessage.textContent = '';
    startBtn.disabled = false;
    nombreJugadorInput.disabled = false; // Habilitar campo de nombre
    showRankingBtn.disabled = false;
    numOptionBtns.forEach(btn => btn.disabled = false);
    modeOptionBtns.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('selected');
    });
    estadoJuego.modoDeJuego = 'artista';
    modeOptionBtns[0].classList.add('selected');
    mostrarRankings();
}
function mostrarPregunta() {
    siguienteBtn.style.display = 'none';
    finalizarBtn.style.display = 'block';
    opcionesContainer.innerHTML = '';
    feedbackTexto.textContent = '';
    const preguntaActual = estadoJuego.preguntasDelJuegoActual[estadoJuego.preguntaActualIndex];
    imagenCuadro.style.display = 'block';
    imagenCuadro.src = preguntaActual.imagen;
    let opcionesParaMostrar = [];
    let respuestaCorrectaDeLaRonda = '';
    if (estadoJuego.modoDeJuego === 'artista') {
        titulo.textContent = '¿Quién es el autor de esta obra?';
        opcionesParaMostrar = [...preguntaActual.opciones];
        respuestaCorrectaDeLaRonda = preguntaActual.respuestaCorrecta;
    } else {
        titulo.textContent = '¿Cuál es el nombre de esta obra?';
        respuestaCorrectaDeLaRonda = preguntaActual.nombreObra;
        const opcionesIncorrectas = [];
        while (opcionesIncorrectas.length < 2) {
            const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
            const obraAleatoria = preguntas[indiceAleatorio];
            if (obraAleatoria.nombreObra !== respuestaCorrectaDeLaRonda && !opcionesIncorrectas.includes(obraAleatoria.nombreObra)) {
                opcionesIncorrectas.push(obraAleatoria.nombreObra);
            }
        }
        opcionesParaMostrar = [respuestaCorrectaDeLaRonda, ...opcionesIncorrectas];
        barajarPreguntas(opcionesParaMostrar);
    }
    opcionesParaMostrar.forEach(opcion => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.classList.add('opcion-btn');
        boton.addEventListener('click', () => verificarRespuesta(opcion, boton, respuestaCorrectaDeLaRonda));
        opcionesContainer.appendChild(boton);
    });
}
function verificarRespuesta(opcionSeleccionada, boton, respuestaCorrecta) {
    document.querySelectorAll('#opciones-container .opcion-btn').forEach(btn => btn.disabled = true);
    if (opcionSeleccionada === respuestaCorrecta) {
        estadoJuego.puntuacion++;
        feedbackTexto.textContent = "¡Correcto!";
        boton.classList.add('correcto');
        sonidoAcierto.play();
    } else {
        const tipoRespuesta = estadoJuego.modoDeJuego === 'artista' ? 'El autor es' : 'La obra es';
        feedbackTexto.textContent = `Incorrecto. ${tipoRespuesta} ${respuestaCorrecta}.`;
        boton.classList.add('incorrecto');
        sonidoFallo.play();
    }
    puntuacionTexto.textContent = `Puntuación: ${estadoJuego.puntuacion}`;
    siguienteBtn.style.display = 'block';
    finalizarBtn.style.display = 'none';
}
function manejarSiguientePaso() {
    estadoJuego.preguntaActualIndex++;
    if (estadoJuego.preguntaActualIndex < estadoJuego.preguntasDelJuegoActual.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}
function mostrarResultados() {
    imagenCuadro.style.display = 'none';
    opcionesContainer.innerHTML = '';
    siguienteBtn.style.display = 'none';
    finalizarBtn.style.display = 'none';
    titulo.textContent = `¡Juego Terminado, ${estadoJuego.nombreJugador}!`;
    feedbackTexto.textContent = `Tu puntuación final es ${estadoJuego.puntuacion} de ${estadoJuego.preguntasDelJuegoActual.length}.`;
    endGameControls.style.display = 'flex';
    guardarPuntuacion();
}
function barajarPreguntas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function cerrarJuego() {
    window.close();
}

// --- EVENT LISTENERS ---
startBtn.addEventListener('click', iniciarJuego);
siguienteBtn.addEventListener('click', manejarSiguientePaso);
finalizarBtn.addEventListener('click', () => { if (confirm("¿Estás seguro de que quieres finalizar el juego?")) { mostrarResultados(); } });
reiniciarBtn.addEventListener('click', () => { if (confirm("¿Estás seguro de que quieres volver al menú principal?")) { reiniciarJuego(); } });
cerrarBtn.addEventListener('click', () => { if (confirm("¿Estás seguro de que quieres cerrar el juego?")) { cerrarJuego(); } });
showRankingBtn.addEventListener('click', mostrarRankingCompleto);
numOptionBtns.forEach(btn => btn.addEventListener('click', handleNumSelection));
modeOptionBtns.forEach(btn => btn.addEventListener('click', handleModeSelection));

document.addEventListener('DOMContentLoaded', () => {
    numOptionBtns[0].classList.add('selected');
    modeOptionBtns[0].classList.add('selected');
    mostrarRankings();
});

// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service worker registrado con éxito.'))
            .catch(err => console.log('Error al registrar el service worker:', err));
    });
}