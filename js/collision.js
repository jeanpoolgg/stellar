// collision.js
var CollisionHandler = function(game, player, enemies) {
    this.game = game;     // Referencia al juego de Phaser
    this.player = player; // Referencia al objeto Player
    this.enemies = enemies; // Referencia al grupo de enemigos

    // Cargar el sonido de colisión
    this.sonidoColision = this.game.add.audio('colision');
};

// Método para manejar la colisión entre las balas del jugador y los enemigos
CollisionHandler.prototype.handleBulletEnemyCollision = function(bullet, enemy) {
    bullet.kill(); // Eliminar la bala
    enemy.kill();  // Eliminar al enemigo impactado

    this.player.actualizarPuntos(10); // Aumentar puntos

    // Reproducir sonido de colisión
    this.sonidoColision.play();

    // Verificar si todos los enemigos han sido destruidos
    if (this.enemies.countLiving() === 0) {
        this.juegoGanar(); // Llamar a la función para manejar la victoria
    }
};

CollisionHandler.prototype.juegoGanar = function() {
    var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.reiniciarJuego, this);
};

CollisionHandler.prototype.reiniciarJuego = function() {
    this.game.state.start('GameState'); // Reiniciar el estado del juego
};

// Método para actualizar las colisiones en cada frame del juego
CollisionHandler.prototype.updateCollisions = function() {
    // Detecta colisiones entre las balas del jugador y los enemigos
    this.game.physics.arcade.overlap(this.player.balas, this.enemies, this.handleBulletEnemyCollision, null, this);
};
