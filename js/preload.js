// preload.js
const PreloadState = {
    preload: function() {
        // Carga los recursos gráficos
        juego.load.image('fondo', 'assets/images/fondo.png'); // Asegúrate de que fondo.png esté en la ruta correcta
        juego.load.image('nave', 'assets/images/nave.png'); // Carga la imagen de la nave
        juego.load.image('laser', 'assets/images/laser.png'); // Carga la imagen del láser
        juego.load.image('enemigo', 'assets/images/enemy.png'); // Carga la imagen del enemigo
        
        // Carga los recursos de audio
        juego.load.audio('disparo', 'assets/sounds/disparo.mp3'); // Carga el sonido de disparo
        juego.load.audio('colision', 'assets/sounds/colision.mp3'); // Carga el sonido de colisión
    },

    create: function() {
        // Cambia al estado del menú inmediatamente después de la precarga
        juego.state.start('menu');
    }
};
