
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface BtnPresion {

	 body: Phaser.Physics.Arcade.Body;
}

export default class BtnPresion extends Phaser.GameObjects.Sprite {


	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "BtnPresion", frame ?? "BtnPresion0001.png");

		this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 280, 49), Phaser.Geom.Rectangle.Contains);
		scene.physics.add.existing(this, false);
		this.body.setSize(280, 49, false);

		/* START-USER-CTR-CODE */
		// Configurar el body para ser estático/inamovible y listo para colisiones
		const body = this.body as Phaser.Physics.Arcade.Body;
		body.setImmovable(true);
		body.moves = false;
		body.pushable = false;
		body.allowGravity = false;
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);



		/* END-USER-CTR-CODE */
	}

	public IsBtnPresion: boolean = true;

	/* START-USER-CODE */

	private isPressed: boolean = false;
	private isTouching: boolean = false;

create() {
			const base = this.scene as any;
			if (base.plataformas) {
				base.plataformas.add(this);
			}
			if (base.player) {
				this.scene.physics.add.collider(this, base.player, this.handlePlatformCollisionPlayer, undefined, this);
			}
			if (base.plataformas) {
				//base.physics.add.collider(this, base.plataformas, this.handlePlatformCollision, undefined, this);
			}
	}

	public handlePlatformCollision(btn: any, platform: any) {
		console.log(platform)
		platform.body.setBounce(0);
		platform.body.setVelocityY(0);
		platform.body.setImmovable(true);
		platform.body.moves = false;
		platform.body.allowGravity = false;	
		platform.body.pushable = false;
		platform.y = btn.y - btn.displayHeight / 2 - platform.displayHeight / 2 + 5;
		
	
		this.isTouching = true;
		if (!this.isPressed) {
			this.isPressed = true;
			this.play("BtnPresionDown", true);
		}

		if (platform?.IsFallingPlatform) {
			if (typeof platform.blinkThenRegenerate === "function") {
				platform.blinkThenRegenerate(4000);
			} else if (typeof platform.scheduleRegeneration === "function") {
				platform.scheduleRegeneration();
			}
		}
	}

	handlePlatformCollisionPlayer(btn: any, player: any) {	


	}

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);
		const body = this.body as Phaser.Physics.Arcade.Body;
		// Reset contacto para este frame; se volverá a poner en true en collider
		const touchingNow = body.touching.none === false || body.wasTouching.none === false || body.embedded || this.isTouching;
		this.isTouching = false;

		// Si estaba presionado y ya no hay contacto, reproducir al revés
		if (this.isPressed && !touchingNow) {
			this.isPressed = false;
			this.playReverse?.("BtnPresionDown");
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
