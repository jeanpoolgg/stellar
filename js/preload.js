// preload.js
const PreloadState = {
    preload: function() {
        // Carga los recursos gráficos
        juego.load.image('fondo', 'assets/images/fondo.png'); // Asegúrate de que fondo.png esté en la ruta correcta
        juego.load.spritesheet('nave', 'assets/images/nave.png', 292, 285); // Cargar la nave con los tamaños correctos de frame
        juego.load.image('laser', 'assets/images/laser.png'); // Carga la imagen del láser
        juego.load.spritesheet('enemigo', 'assets/images/enemy.png', 200, 200); // Cargar la hoja de sprites del enemigo
        
        // Carga los recursos de audio
        juego.load.audio('disparo', 'assets/sounds/disparo.mp3'); // Carga el sonido de disparo
        juego.load.audio('colision', 'assets/sounds/colision.mp3'); // Carga el sonido de colisión
    },

    create: function() {
        // Cambia al estado del menú inmediatamente después de la precarga
        juego.state.start('menu');
    }
};
