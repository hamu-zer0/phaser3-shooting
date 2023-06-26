const D_WIDTH = 480;
const D_HEIGHT = 320;
let player;
let player_arr=[];
let player_bullets=[];
let enemy;
let enemy_arr=[];
let ground_arr=[];//上、下、左、右
let bullet_size=[];//width,height

var groundkey={
	top:0,
	bottom:1,
	left:2,
	right:3
};

var Bulletkey = {
    w : 0,
    q : 1,
    e : 2,
	a : 3,
    d : 4
};

class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y,staticGroup,enemy) {
	  super(scene, x, y, "tanuki");
	  scene.add.existing(this);
	  scene.physics.add.existing(this);
	  this.setGravityY(300);
	  this.hp=2;
	  this.shootInterval=500;
	  this.lastshootTime=Date.now();
	  this.staticGroup = staticGroup; 
	  this.enemy = enemy;


	}
  
	update() {
	  
	  let cursors = this.scene.input.keyboard.createCursorKeys();
	  if (cursors.up.isDown) {
		this.setVelocityY(-200);
	  } else if (cursors.left.isDown) {
		this.setVelocityX(-200);
	  } else if (cursors.right.isDown) {
		this.setVelocityX(200);
	  } else {
		this.setVelocityX(0);
	  }
	}
  
	shootBullet(key) {
		let currentTime=Date.now();
		//console.log(currentTime);
		let timeDiff =currentTime - this.lastshootTime;
		//console.log(timeDiff);
		//console.log(this.lastshootTime);

		if(timeDiff>=this.shootInterval){
			const newBullet = new Bullet(this.scene, this.x, this.y, this,this.staticGroup,this.enemy,key,ground_arr);
			this.lastshootTime=currentTime;
			player_bullets.push(newBullet);
			console.log("射撃");
			// console.log("bulletsize.width="+newBullet.body.width);
			// console.log("bulletsize.height="+newBullet.body.height);
			// console.log("bulletsize.width="+bullet_size[0]);
			// console.log("bulletsize.height="+bullet_size[1]);
		}
	}
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, player,staticGroup,enemy,key,ground_arr) {
	  super(scene, x, y, "bullet_black");
	  scene.add.existing(this);
	  scene.physics.add.existing(this);
	  this.setDisplaySize(20, 20);
	  this.key=key;
	  this.horvelocity=200;
	  this.diavelocity_x=200;
	  this.diavelocity_y=200;
	  bullet_size[0]=this.body.width;
	  bullet_size[1]=this.body.height;
	  if(this.key==Bulletkey.w){
		this.velocity_x=this.horvelocity;
	  	this.velocity_y=0;
	  	this.setVelocityX(this.velocity_x);
	  	this.setVelocityY(this.velocity_y);
		console.log("this.body.velocity.x="+this.body.velocity.x);
		console.log("this.body.velocity.y="+this.body.velocity.y);
	  }else if(this.key==Bulletkey.e){
		this.velocity_x=this.diavelocity_x;
	  	this.velocity_y=-this.diavelocity_y;
	  	this.setVelocityX(this.velocity_x);
	  	this.setVelocityY(this.velocity_y);
		console.log("this.body.velocity.x="+this.body.velocity.x);
		console.log("this.body.velocity.y="+this.body.velocity.y);
	  }else if(this.key==Bulletkey.q){
		this.velocity_x=-this.diavelocity_x;
	  	this.velocity_y=-this.diavelocity_y;
	  	this.setVelocityX(this.velocity_x);
	  	this.setVelocityY(this.velocity_y);
		console.log("this.body.velocity.x="+this.body.velocity.x);
		console.log("this.body.velocity.y="+this.body.velocity.y);
	  }else if(this.key==Bulletkey.a){
		this.velocity_x=-this.diavelocity_x;
	  	this.velocity_y=this.diavelocity_y;
	  	this.setVelocityX(this.velocity_x);
	  	this.setVelocityY(this.velocity_y);
		console.log("this.body.velocity.x="+this.body.velocity.x);
		console.log("this.body.velocity.y="+this.body.velocity.y);
	  }
	  else if(this.key==Bulletkey.d){
		this.velocity_x=this.diavelocity_x;
	  	this.velocity_y=this.diavelocity_y;
	  	this.setVelocityX(this.velocity_x);
	  	this.setVelocityY(this.velocity_y);
		console.log("this.body.velocity.x="+this.body.velocity.x);
		console.log("this.body.velocity.y="+this.body.velocity.y);
	  }

	  this.setGravity(0);
	  this.setBounce(1,1);
	  //this.setCollideWorldBounds(true);
	  this.player = player; // プレイヤーオブジェクトの参照を保持
	  this.bounceCount = 0; // 壁に跳ね返った回数のカウント
	  //this.staticGroup = staticGroup; 
	 

	// 衝突イベントのリスナーを登録
	scene.physics.add.collider(this, staticGroup, this.handleCollisionWithStatic, null, this);
	scene.physics.add.collider(this, enemy, this.handleCollisionWithEnemy, null, this);

}

	update() {
		// ここに弾丸の更新処理を追加
	  }

	  handleCollisionWithStatic(bullet,ground) {
		// 壁に衝突した場合の処理を記述
		// 例: 反射させる処理など
		console.log(this.bounceCount);
		console.log("反射");


		//弾の跳ね返り処理
		//衝突してから判定をしているので、判定しているときには跳ね返った方向になっている
		//x軸は右向き正、y軸は下向き正
		//いらなかった泣
		// if(ground==ground_arr[groundkey.left] || ground==ground_arr[groundkey.right]){
		// 	//console.log(this.body.velocity.x);
		// 	//console.log(this.body.velocity.y);
		// 	if(this.body.velocity.x<=0&&this.body.velocity.y<0){
		// 		this.setVelocityX(-this.diavelocity_x);
		// 		this.setVelocityY(-this.diavelocity_y);
		// 	}else if(this.body.velocity.x<=0&&this.body.velocity.y>0){
		// 		this.setVelocityX(-this.diavelocity_x);
		// 		this.setVelocityY(this.diavelocity_y);
		// 	}else if(this.body.velocity.x>0&&this.body.velocity.y<0){
		// 		this.setVelocityX(this.diavelocity_x);
		// 		this.setVelocityY(-this.diavelocity_y);
		// 	}else if(this.body.velocity.x>0&&this.body.velocity.y>0){
		// 		this.setVelocityX(this.diavelocity_x);
		// 		this.setVelocityY(this.diavelocity_y);
		// 	}else if(this.body.velocity.x<=0&&this.body.velocity.y==0){
		// 		this.setVelocityX(-this.horvelocity);
		// 		this.setVelocityY(0);
		// 	}else if(this.body.velocity.x>0&&this.body.velocity.y<0){
		// 		this.setVelocityX(this.horvelocity);
		// 		this.setVelocityY(0);
		// 	}
		// }else if(ground==ground_arr[groundkey.top] || ground==ground_arr[groundkey.bottom]){
		// 	if(this.body.velocity.x<=0&&this.body.velocity.y<=0){
		// 		console.log("a");
		// 		console.log("this.body.velocity.x="+this.body.velocity.x);
		// 		console.log("this.body.velocity.y="+this.body.velocity.y);
		// 		this.setVelocityX(-this.diavelocity_x);
		// 		this.setVelocityY(-this.diavelocity_y);
		// 		console.log("this.body.velocity.x="+this.body.velocity.x);
		// 		console.log("this.body.velocity.y="+this.body.velocity.y);
		// 	}else if(this.body.velocity.x<=0&&this.body.velocity.y>0){
		// 		console.log("b");
		// 		console.log("this.body.velocity.x="+this.body.velocity.x);
		// 		console.log("this.body.velocity.y="+this.body.velocity.y);
		// 		this.setVelocityX(-this.diavelocity_x);
		// 		this.setVelocityY(this.diavelocity_y);
		// 		console.log("this.body.velocity.x="+this.body.velocity.x);
		// 		console.log("this.body.velocity.y="+this.body.velocity.y);
		// 	}else if(this.body.velocity.x>0&&this.body.velocity.y<=0){
		// 		console.log("c");
		// 		console.log("this.body.velocity.x="+this.body.velocity.x);
		// 		console.log("this.body.velocity.y="+this.body.velocity.y);
		// 		this.setVelocityX(this.diavelocity_x);
		// 		this.setVelocityY(-this.diavelocity_y);
		// 		console.log("this.body.velocity.x="+this.body.velocity.x);
		// 		console.log("this.body.velocity.y="+this.body.velocity.y);
		// 	}else{
		// 		console.log("d");
		// 		console.log("this.body.velocity.x="+this.body.velocity.x);
		// 		console.log("this.body.velocity.y="+this.body.velocity.y);
		// 		this.setVelocityX(this.diavelocity_x);
		// 		this.setVelocityY(this.diavelocity_y);
		// 		console.log("this.body.velocity.x="+this.body.velocity.x);
		// 		console.log("this.body.velocity.y="+this.body.velocity.y);
		// 	}
		// }
		this.bounceCount++; // カウントを増やす

		if (this.bounceCount >= 4) {
			// 壁に3度跳ね返った場合に弾丸を削除する
			console.log("消滅");
			this.destroy();
			for(let i=0;i<player_bullets.length;i++){
				if(player_bullets[i]==this){
					player_bullets.splice(i, 1); // 配列から弾丸を削除
				}
			}
		  }
	  }
	  handleCollisionWithEnemy(){
		delete enemy_arr[0];
		enemy.destroy();
		this.destroy();
		for(let i=0;i<player_bullets.length;i++){
			if(player_bullets[i]==this){
				player_bullets.splice(i, 1); // 配列から弾丸を削除
			}
		}
	  }
}

class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y,staticGroup) {
	  super(scene, x, y, "tanuki"); // 仮のテクスチャ名です
	//   this.setDisplaySize(32, 32); // 適切なサイズに設定してください
	//   this.setCollideWorldBounds(true);
	  scene.add.existing(this);
	  scene.physics.add.existing(this);
	  //this.body.setSize(width, height);当たり判定の大きさ設定 
	  this.setGravityY(300);
	  this.shootInterval=500;
	  this.lastshootTime=Date.now();
	  this.staticGroup = staticGroup; 
	  this.shootedBullet=0;
	//   this.player = player; // プレイヤーオブジェクトの参照を保持
  
	  // 衝突イベントのリスナーを登録
	  scene.physics.add.collider(this, staticGroup, this.handleCollisionWithStatic, null, this);
	}
  
	update() {
	  // ここにEnemyの更新処理を追加
		if(!enemy_arr[0]){

		}else{
			this.enemyMovement();
		  	if(this.shootedBullet<=3){
		  		this.shootBullet();
				//this.shootedBullet++;
	  		}
		}
	}

	shootBullet() {
		let currentTime=Date.now();
		console.log(currentTime);
		let timeDiff =currentTime - this.lastshootTime;
		console.log(timeDiff);
		console.log(this.lastshootTime);
		console.log("enemy弾丸発射")

		if(timeDiff>=this.shootInterval){
		const newBullet = new E_Bullet(this.scene, this.x, this.y, player_arr[0],this.staticGroup,this);
		this.lastshootTime=currentTime;
		this.shootedBullet++;
		console.log("射撃");
		}
	}
  
	handleCollisionWithStatic() {
	  // 壁に衝突した場合の処理を記述
	  // 例: 反射させる処理など
	  //this.destroy();
	}

	enemyMovement(){
		if(!player_arr[0] || !enemy_arr[0]){

		}else{
			let enemy_size_width=enemy_arr[0].body.width;//当たり判定の大きさ
			let enemy_size_height=enemy_arr[0].body.height;
			let enemy_position_x=enemy_arr[0].x;
			let enemy_position_y=enemy_arr[0].y;
			let player_position_x=player_arr[0].x;
			let player_position_y=player_arr[0].y;
			let player_velocity_x=player_arr[0].body.velocity.x;
			let player_velocity_y=player_arr[0].body.velocity.y;
			let nearest_player_bullet_position_x;
			let nearest_player_bullet_position_y;
			let nearest_player_bullet_distance;
			let nearest_player_bullet_velosity_x;
			let nearest_player_bullet_velosity_y;

			if(!player_bullets[0]){
				
			}else{
			//初期値
				nearest_player_bullet_position_x = player_bullets[0].x;
				nearest_player_bullet_position_y = player_bullets[0].y;
				nearest_player_bullet_distance = ((enemy_position_x-player_bullets[0].x)**2)+((enemy_position_y-player_bullets[0].y))**2;
				nearest_player_bullet_velosity_x=player_bullets[0].body.velocity.x;
				nearest_player_bullet_velosity_y=player_bullets[0].body.velocity.y;
				console.log("enemy_size_width/2="+enemy_size_width/2);
				console.log("enemy_size_height/2="+enemy_size_height/2);
				//console.log("enemy_position_x-player_bullets[0].x)**2="+((enemy_position_x-player_bullets[0].x)**2));
				//console.log("enemy_position_y-player_bullets[0].y)**2="+((enemy_position_y-player_bullets[0].y)**2));
				for(let i=1;i<player_bullets.length;i++){
					//console.log(player_bullets[i]);
					let distanceToEnemy=((enemy_position_x-player_bullets[i].x)**2)+((enemy_position_y-player_bullets[i].y)**2);
					//console.log("enemy_position_x-player_bullets[i].x)**2="+((enemy_position_x-player_bullets[i].x)**2));
					//console.log("enemy_position_y-player_bullets[i].y)**2="+((enemy_position_y-player_bullets[i].y)**2));
					//console.log("distanceToEnemy="+distanceToEnemy);
					if(distanceToEnemy < nearest_player_bullet_distance){
						nearest_player_bullet_position_x = player_bullets[i].x;
						nearest_player_bullet_position_y = player_bullets[i].y;
						nearest_player_bullet_distance = distanceToEnemy;
						nearest_player_bullet_velosity_x=player_bullets[i].body.velocity.x;
						nearest_player_bullet_velosity_y=player_bullets[i].body.velocity.y;
						//console.log("一番近い弾は"+nearest_player_bullet_distance);
					}
				}
				//console.log("距離は"+nearest_player_bullet_distance)
				if(nearest_player_bullet_velosity_y==0){//横向き
					if(nearest_player_bullet_position_y>=enemy_position_y){
						if(nearest_player_bullet_distance<6000){
							this.setVelocityY(-200);
							nearest_player_bullet_distance=0;
						}else{
	
						}
					}else if(nearest_player_bullet_position_y+this.body.height>=enemy_position_y){
						if(nearest_player_bullet_distance<9000){
							this.setVelocityY(-200);
							nearest_player_bullet_distance=0;
						}else{
	
						}
					}
				}else if(nearest_player_bullet_velosity_x>0&&nearest_player_bullet_velosity_y<0){//右上向き
					if(nearest_player_bullet_distance<6000){
						if(nearest_player_bullet_position_y<=-nearest_player_bullet_position_x+enemy_position_x+enemy_size_width/2+enemy_position_y+enemy_size_height/2){
							this.setVelocityX(200);
							this.setVelocityY(200);
						}else{
							this.setVelocityX(-200);
							this.setVelocityY(-200);
						}
					}
				}else if(nearest_player_bullet_velosity_x>0&&nearest_player_bullet_velosity_y>0){//右下向き
					if(nearest_player_bullet_distance<6000){
						if(nearest_player_bullet_position_y<=nearest_player_bullet_position_x-enemy_position_x-enemy_size_width/2+enemy_position_y+enemy_size_height/2){
							this.setVelocityX(-200);
							this.setVelocityY(200);
						}else{
							this.setVelocityX(200);
							this.setVelocityY(-200);
						}
					}
				}else if(nearest_player_bullet_velosity_x<0&&nearest_player_bullet_velosity_y<0){//左上向き
					if(nearest_player_bullet_distance<6000){
						if(nearest_player_bullet_position_y<=nearest_player_bullet_position_x-enemy_position_x-enemy_size_width/2+enemy_position_y+enemy_size_height/2){
							this.setVelocityX(-200);
							this.setVelocityY(200);
						}else{
							this.setVelocityX(200);
							this.setVelocityY(-200);
						}
					}
				}else if(nearest_player_bullet_velosity_x<0&&nearest_player_bullet_velosity_y>0){//左下向き
					if(nearest_player_bullet_distance<6000){
						if(nearest_player_bullet_position_y<=-nearest_player_bullet_position_x+enemy_position_x+enemy_size_width/2+enemy_position_y+enemy_size_height/2){
							this.setVelocityX(200);
							this.setVelocityY(200);
						}else{
							this.setVelocityX(-200);
							this.setVelocityY(-200);
						}
					}
				}
				
			}
		}
	}
  }

  class E_Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, player,staticGroup,enemy) {
	  super(scene, x, y, "bullet_black");
	  scene.add.existing(this);
	  scene.physics.add.existing(this);
	  this.setDisplaySize(20, 20);
	  this.velocity_x=200;
	  this.velocity_y=0;
	  this.setVelocityX(this.velocity_x);
	  this.setVelocityY(this.velocity_y);
	  this.setGravity(0);
	  //this.setBounce(1,1);
	  //this.setCollideWorldBounds(true);
	  this.scene=scene;
	  this.player = player; // プレイヤーオブジェクトの参照を保持
	  this.bounceCount = 0; // 壁に跳ね返った回数のカウント
	  //this.staticGroup = staticGroup; 

	// 衝突イベントのリスナーを登録
	scene.physics.add.collider(this, staticGroup, this.handleCollisionWithStatic, null, this);
	scene.physics.add.collider(this, player, this.handleCollisionWithPlayer, null, this);

}

	update() {
		// ここに弾丸の更新処理を追加
	  }

	  handleCollisionWithStatic() {
		// 壁に衝突した場合の処理を記述
		// 例: 反射させる処理など
		console.log(this.bounceCount);
		console.log("E反射");
		console.log(this.body.velocity.x);
		console.log(this.body.velocity.y);
		if(!enemy_arr[0]){
			this.destroy();
		}//else if(this.body.velocity.x<0){
		// 	console.log("E右→左")
		// 	this.setVelocityX(-this.velocity_x);
		// 	this.setVelocityY(this.velocity_y);
		// }else{
		// 	console.log("E左→右");
		// 	this.setVelocityX(this.velocity_x);
		// 	this.setVelocityY(this.velocity_y);
		// }		
		this.bounceCount++; // カウントを増やす
		if(!enemy_arr[0]){//enemyインスタンスがない場合のif分がないとエラーになる
			console.log("enemyインスタンスが死んだ");
		}else if (this.bounceCount >= 3) {
			// 壁に3度跳ね返った場合に弾丸を削除する
			console.log("E消滅");
			this.destroy();
			enemy_arr[0].shootedBullet--;
			//bullets.splice(i, 1); // 配列から弾丸を削除
		  }
	  }
	  handleCollisionWithPlayer(){
		player_arr[0].hp=player.hp-1;
		console.log("HP"+player_arr[0].hp);
		this.destroy();
		if(!enemy_arr[0]){

		}else{
			enemy_arr[0].shootedBullet--;
			if(player_arr[0].hp==0){
				//this.scene.restart();
				//delete player_arr[0];
			}
		}
	  }
}

const PAUSE_TEXT = "一時停止";
const RESUME_TEXT = "再開";

class PauseButton extends Phaser.GameObjects.Text {
  constructor(scene, style) {
    super(scene, 0, 0, PAUSE_TEXT, style); // 初期位置をゲーム画面外に設定
    this.setInteractive();
    this.on("pointerup", this.togglePause, this);
    scene.add.existing(this);
  }

  togglePause() {
    const scene = this.scene;
    if (scene.scene.isPaused()) {
      scene.scene.resume();
      this.setText(PAUSE_TEXT);
    } else {
      scene.scene.pause();
      this.setText(RESUME_TEXT);
    }
  }
}



// 1, Phaser3の設定データ
const config = {
	type: Phaser.AUTO,
	width: D_WIDTH,// ゲーム画面の横幅
	height: D_HEIGHT,// ゲーム画面の高さ
	antialias: false,
	scene: {
		preload: preload,// 素材の読み込み時の関数
		create: create,// 画面が作られた時の関数
		update: update// 連続実行される関数
	},
	fps: {
		target: 24,// フレームレート
		forceSetTimeOut: true
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,// スプライトに緑の枠を表示します
			//gravity: {y: 300}// 重力の方向とその強さ
		}
	}
}

// 2, Phaser3オブジェクトを作る
let phaser = new Phaser.Game(config);

function preload(){
	console.log("preload!!");
    this.load.image("background", "./assets/background.jpg");
    this.load.image("ground", "./assets/ground.png");
	this.load.image("tanuki", "./assets/tanuki.png");
	this.load.image("bullet_black","./assets/bullet_black.png");
}

function create(){
	console.log("create!!");
    this.add.image(D_WIDTH/2, D_HEIGHT/2, "background");// 画面の中心に表示します
	const staticGroup = this.physics.add.staticGroup();// 動かない物体をまとめる
	let topGround = staticGroup.create(D_WIDTH/2, 0, "ground"); // 上部の地面
	ground_arr.push(topGround);
	let bottomGround=staticGroup.create(D_WIDTH/2, D_HEIGHT, "ground"); // 下部の地面
	ground_arr.push(bottomGround);

	let leftGround = staticGroup.create(0, D_HEIGHT / 2, "ground").setAngle(90);
	this.physics.add.existing(leftGround);
	leftGround.body.setSize(32, 2*D_HEIGHT, true);
	leftGround.body.setOffset(D_WIDTH / 2, -150);
	ground_arr.push(leftGround);

	let rightGround = staticGroup.create(D_WIDTH, D_HEIGHT / 2, "ground").setAngle(90);
	this.physics.add.existing(rightGround);
	rightGround.body.setSize(32, D_HEIGHT, true);
	rightGround.body.setOffset(D_WIDTH / 2 -32, -130);
	ground_arr.push(rightGround);

	enemy = new Enemy(this,350,80,staticGroup);
	enemy_arr.push(enemy);
	player = new Player(this, 240, 80,staticGroup,enemy);// プレイヤー
	player_arr.push(player);

	this.physics.add.collider(player, staticGroup);// 衝突処理を設定する
	this.physics.add.collider(enemy, staticGroup);

	const style = { font: "24px Arial", fill: "#ffffff" };
	const pauseButton = new PauseButton(this, style);
	//キーボードの入力を検出する
	this.keys = this.input.keyboard.addKeys('w,e,q,a,d');
	
}


function update(){
	console.log("update!!");

	enemy.update();
	
	if(!player_arr[0]){

	}
	else{
		player.update();
		if (this.keys.w.isDown) {
			player.shootBullet(Bulletkey.w);
  		}else if(this.keys.e.isDown){
			player.shootBullet(Bulletkey.e);
		}else if(this.keys.q.isDown){
			player.shootBullet(Bulletkey.q);
		}else if(this.keys.a.isDown){
			player.shootBullet(Bulletkey.a);
		}else if(this.keys.d.isDown){
			player.shootBullet(Bulletkey.d);
		}



		if(player_arr[0].hp<=0){
		player.destroy();
		delete player_arr[0];
		// this.scene.sys.restart();
		//console.log("リスタート");
		//location.reload();//ページを再読み込み
		}else{
			//console.log("体力あるよ！"+player.hp);
		}
	}
}
