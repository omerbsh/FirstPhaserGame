

class SceneMain extends Phaser.Scene {
	constructor() {
		super('SceneMain');
	}





	preload() {
		// idle cat
		this.load.image("cat_idle_1", "images/characters/cat/Idle_1.png");
		this.load.image("cat_idle_2", "images/characters/cat/Idle_2.png");
		this.load.image("cat_idle_3", "images/characters/cat/Idle_3.png");
		this.load.image("cat_idle_4", "images/characters/cat/Idle_4.png");
		this.load.image("cat_idle_5", "images/characters/cat/Idle_5.png");
		this.load.image("cat_idle_6", "images/characters/cat/Idle_6.png");
		this.load.image("cat_idle_7", "images/characters/cat/Idle_7.png");
		this.load.image("cat_idle_8", "images/characters/cat/Idle_8.png");
		this.load.image("cat_idle_9", "images/characters/cat/Idle_9.png");
		this.load.image("cat_idle_10", "images/characters/cat/Idle_10.png");
		// run right cat
		this.load.image("cat_run1", "images/characters/cat/Run_1.png");
		this.load.image("cat_run2", "images/characters/cat/Run_2.png");
		this.load.image("cat_run3", "images/characters/cat/Run_3.png");
		this.load.image("cat_run4", "images/characters/cat/Run_4.png");
		this.load.image("cat_run5", "images/characters/cat/Run_5.png");
		this.load.image("cat_run6", "images/characters/cat/Run_6.png");
		this.load.image("cat_run7", "images/characters/cat/Run_7.png");
		this.load.image("cat_run8", "images/characters/cat/Run_8.png");
		// ground
		this.load.image("ground", "images/ground.png");
		this.load.image("ground2", "images/ground-2.png");
		this.load.image("bullet", "images/bullet.png"); //Shooting
		this.load.image("enemy", "images/parrot.png"); //Shooting
	}
	create() {

		var Bullet = new Phaser.Class({

			Extends: Phaser.GameObjects.Image,

			initialize:

				// Bullet Constructor
				function Bullet(scene) {
					Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
					this.speed = 1;
					this.born = 0;
					this.direction = 0;
					this.xSpeed = 0;
					this.ySpeed = 0;
					this.setSize(12, 12, true);
				},

			// Fires a bullet from the player to the reticle
			fire: function (shooter, isLeft) {
				this.setPosition(shooter.x, shooter.y); // Initial position

				if (isLeft) this.xSpeed = -this.speed;
				else this.xSpeed = this.speed;

				this.born = 0; // Time since new bullet spawned
			},

			// Updates the position of the bullet each cycle
			update: function (time, delta) {
				this.x += this.xSpeed * delta;
				this.y += this.ySpeed * delta;
				this.born += delta;
				if (this.born > 1000) {
					this.setActive(false);
					this.setVisible(false);
				}
			}

		});

		var Enemy = new Phaser.Class({

			

			Extends: Phaser.Physics.Arcade.Sprite,

			initialize:
			function Enemy(scene) {
				this.directionLeft = true;
				Phaser.Physics.Arcade.Sprite.call(this, scene, 400, 300, 'enemy');
				
				scene.physics.add.collider(this, scene.ground);
				scene.physics.add.collider(this, scene.ground2);
				this.setScale(0.3)
				scene.physics.world.enable(this);
				this.setGravityY(200);
				this.setVelocityY(100);
				console.log(this.body);
				console.log(this);
				this.setSize(this.width,this.height,true);
				this.scene = this;
			},


			update: function(time,delta)
			{
				if(this.directionLeft) 
				{
					this.x-=1;
				}
				else
				{
					this.x+=1;
				}				

				if((!this.body.touching.down)&&(this.body.wasTouching.down))
				{
					this.x = this.previousX;
					this.y = this.previousY;
					this.directionLeft = !this.directionLeft;
				}
				else
				{
					this.previousX = this.x;
					this.previousY = this.y;
				}

				//console.log(this.body.touching)
			}
		});

		this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true, maxSize: 1 }); //Shooting
		this.enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true, maxSize: 1 }); //Enemies
		this.power = 0;
		this.CAT_IDLE = 0;
		this.CAT_RUNNING = 1;
		this.catMode = -1;
		this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.key_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //Shooting button
		this.anims.create({
			key: 'catIdle',
			frames: [
				{ key: 'cat_idle_1' },
				{ key: 'cat_idle_2' },
				{ key: 'cat_idle_3' },
				{ key: 'cat_idle_4' },
				{ key: 'cat_idle_5' },
				{ key: 'cat_idle_6' },
				{ key: 'cat_idle_7' },
				{ key: 'cat_idle_8' },
				{ key: 'cat_idle_9' },
				{ key: 'cat_idle_10' },
			],
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'catRun',
			frames:
				[
					{ key: 'cat_run1' },
					{ key: 'cat_run2' },
					{ key: 'cat_run3' },
					{ key: 'cat_run4' },
					{ key: 'cat_run5' },
					{ key: 'cat_run6' },
					{ key: 'cat_run7' },
					{ key: 'cat_run8' },
				],
			frameRate: 12,
			repeat: -1
		});

		this.ground = this.physics.add.sprite(240, 600, "ground");
		this.ground2 = this.physics.add.sprite(240, 300, "ground2");
		this.ground.setImmovable();
		this.ground2.setImmovable();
		this.catIdle();
		this.catCharacter.setGravityY(200);
		this.catCharacter.setVelocityY(100);
		this.enemyCharacter = this.enemies.get();
		this.enemyCharacter.setGravityY(200);
		this.enemyCharacter.setVelocityY(100);
		this.physics.add.collider(this.catCharacter, this.ground);
		this.physics.add.collider(this.catCharacter, this.ground2);

		var keyObj = this.input.keyboard.addKey('W');

		keyObj.on('down', this.startJump, this);
		keyObj.on('up', this.endJump, this);

		//this.bullets.setAll('checkWorldBounds', true);
		//this.bullets.setAll('outOfBoundsKill', true);
		//End Shooting
	}
	update() {


		if (this.key_space.isDown) {
			var bullet = this.playerBullets.get()

			if (bullet) {
				bullet.setActive(true).setVisible(true);
				bullet.fire(this.catCharacter, this.catCharacter.flipX);
				//this.physics.add.collider(enemy, bullet, enemyHitCallback); //Add once there are enemies
			}
		}

		if (this.key_left.isDown) {
			if (this.catCharacter.flipX == false) {
				this.catCharacter.flipX = true;
			}
			this.catCharacter.x -= 2;
			if (this.catMode == this.CAT_IDLE) {
				this.catMode = this.CAT_RUNNING;
				this.catCharacter.anims.play('catRun');
			}
		}
		else if (this.key_right.isDown) {
			if (this.catCharacter.flipX == true) {
				this.catCharacter.flipX = false;
			}
			this.catCharacter.x += 2;
			if (this.catMode == this.CAT_IDLE) {
				this.catMode = this.CAT_RUNNING;
				this.catCharacter.anims.play('catRun');
			}
		}
		else {
			if (this.catMode != this.CAT_IDLE) {
				this.catCharacter.anims.play('catIdle');
				this.catMode = this.CAT_IDLE;
			}

		}
		// console.log( this.catCharacter.body.onFloor() );
		if (this.catCharacter.body.onFloor()) {
			console.log('cat on ground');
		}
	}

	enemyHitCallback(enemyHit, bulletHit) {

		if (bulletHit.active === true && enemyHit.active === true) {
			enemyHit.setActive(false).setVisible(false);
			bulletHit.setActive(false).setVisible(false);
		}
	}

	endJump() {
		console.log('endjump');
		this.timer.remove();
		this.catCharacter.setVelocityY(-350);
		this.power = 0;
	}
	startJump() {
		console.log('startjump');
		this.timer = this.time.addEvent({ delay: 100, callback: this.tick, callbackScope: this, loop: true });
		// this.catCharacter.setVelocityY(-100);
	}
	tick() {
		if (this.power < 5) {
			this.power += .3;
		}
	}
	catIdle() {
		this.catCharacter = this.physics.add.sprite(100, 100, 'cat_idle_1');
		this.catCharacter.setSize(200, 450, true);
		this.catCharacter.scaleX = this.catCharacter.scaleY = 0.3
	}
	catMove() {
		//this.catCharacter.loadTexture('catRun');
	}


}