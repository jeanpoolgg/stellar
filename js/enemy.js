// enemy.js
var Enemy = function(game, x, y) {
    this.game = game; 
    this.sprite = game.add.sprite(x, y, 'enemigo');
    this.sprite.anchor.setTo(0.5);
    this.sprite.scale.setTo(0.05, 0.05);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.moves = false;
    
    // Guardar una referencia al objeto Enemy dentro del propio sprite
    this.sprite.enemyRef = this;
};

Enemy.prototype.destruir = function() {
    this.sprite.kill(); // Elimina el sprite del juego
};

