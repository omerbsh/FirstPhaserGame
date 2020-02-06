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
	}
	create() {
		this.power=0;
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

		this.ground=this.physics.add.sprite(240, 600, "ground");
		this.ground.setImmovable();
		this.catIdle();
		this.catCharacter.setGravityY(200);
		this.catCharacter.setVelocityY(100);
		this.physics.add.collider(this.catCharacter, this.ground);
		
		var keyObj = this.input.keyboard.addKey('W');

		keyObj.on('down', this.startJump, this);
		keyObj.on('up', this.endJump, this);
	}
	update() {
		var key_right=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		var key_left=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		var key_up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

		if ( key_left.isDown ) {
			if( this.catCharacter.flipX == false ) {
				this.catCharacter.flipX=true;
			}
			this.catCharacter.x-=2;
		}
		else if ( key_right.isDown ) {
			if( this.catCharacter.flipX == true ) {
				this.catCharacter.flipX=false;
			}
			this.catCharacter.x+=2;
		}
		else {
			console.log('cat idle');
			this.catCharacter.setTexture('cat_idle_1');
		}
		// console.log( this.catCharacter.body.onFloor() );
		if( this.catCharacter.body.onFloor() ) {
			console.log('cat on ground');
		}
	}
	endJump() {
		console.log('endjump');
		this.timer.remove();
		this.catCharacter.setVelocityY(-350);
		this.power=0;
	}
	startJump() {
		console.log('startjump');
		this.timer=this.time.addEvent({ delay: 100, callback: this.tick, callbackScope: this, loop: true });
		// this.catCharacter.setVelocityY(-100);
	}
	tick() {
		if (this.power<5) {
			this.power+=.3;
		}
	}
	catIdle() {
		this.catCharacter=this.physics.add.sprite(100,100, 'cat_idle_1');
		this.catCharacter.displayWidth=150;
		this.catCharacter.displayHeight=150;
		this.catCharacter.play('catRun');
	}
	catMove() {
		//this.catCharacter.loadTexture('catRun');
	}
}