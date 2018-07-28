class Door {
  constructor(x, y, d, isEditor ) {
      this.destination = d;
      var offX = 50
      var offY = -110
      if (isEditor == true) {
          offX = 0
          offY = -210
      }
    this.sprite = doors.create(x + offX, y + offY, 'door');
    if (isEditor === undefined || isEditor == false) {
        this.sprite.body.setRectangle(this.sprite.width, this.sprite.height);

        this.sprite.body.static = true;
        this.sprite.body.setCollisionGroup(doorCollisionGroup);
        this.sprite.body.collides([]);
    }
  }

  enter() {
    player.sprite.body.velocity.x = 0;
    player.sprite.body.velocity.y = 0;
    var player_solid = true;

    var flicker_loop = setInterval(function(){
      if ( player_solid ) {
        player.sprite.alpha = 0.2;
      } else {
        player.sprite.alpha = 1;
      }

      player_solid = !player_solid;
    }, 50);
    
    game.add.tween(player.sprite.body).to(
      this.destination, 
      400, 
      Phaser.Easing.Quadratic.InOut, 
      true
    ).onComplete.add(function(){
      clearInterval(flicker_loop);
      player.sprite.alpha = 1;
    });
  };
}
