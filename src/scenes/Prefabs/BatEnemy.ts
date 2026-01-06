
// You can write more code here

/* START OF COMPILED CODE */

import { SpineGameObject } from "@esotericsoftware/spine-phaser";
import { SpinePlugin } from "@esotericsoftware/spine-phaser";
import { SpineGameObjectBoundsProvider } from "@esotericsoftware/spine-phaser";
import { SkinsAndAnimationBoundsProvider } from "@esotericsoftware/spine-phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface BatEnemy {

	 body: Phaser.Physics.Arcade.Body;
}

export default class BatEnemy extends SpineGameObject {

	constructor(scene: Phaser.Scene, plugin: SpinePlugin, x: number, y: number, dataKey?: string, atlasKey?: string, skin?: string, boundsProvider?: SpineGameObjectBoundsProvider, xargs?: any) {
		super(scene, plugin, x ?? 0, y ?? 0, dataKey ?? "BatEnemy", atlasKey ?? "BatEnemy-atlas", boundsProvider ?? new SkinsAndAnimationBoundsProvider(null, ["default"]));

		this.skeleton.setSkinByName(skin ?? "default");
		this.scaleX = 0.4;
		this.scaleY = 0.4;
		scene.physics.add.existing(this, false);
		this.body.setSize(143.0000019028185, 117.99999999999997, false);

		/* START-USER-CTR-CODE */
			// Reproduce Born una vez y encadena Idle de inmediato
			this.animationState.setAnimation(0, "Born", false);
			this.animationState.addAnimation(0, "Idle", true, 0);
			const body = this.body as Phaser.Physics.Arcade.Body;
		body.setAllowGravity(false);
		body.setGravityY(0);           // más fuerte
		body.setDrag(0, 0);
		body.setMaxVelocity(300, 1200);  // evita límites bajos
			this.scene.physics.add.overlap((this.scene as any).player, this, this.killPlayer, undefined, this);
		// Tras Born, baja unos píxeles con un pequeño bounce
		let bornSettled = false;
		this.animationState.addListener({
			complete: (entry) => {
				if (bornSettled) return;
				if (entry && entry.animation && entry.animation.name === "Born") {
					bornSettled = true;
					const startY = this.y;
					this.scene.tweens.add({
						targets: this,
						y: startY + 30,
						duration: 500,
						ease: 'Bounce.Out',
						onComplete: () => {
							// Al terminar el bounce, decide una dirección horizontal
							const dir = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
							const speed = 140;
								(body as Phaser.Physics.Arcade.Body).setVelocity(dir * speed, 0);
								this.baseY = this.y;
								this.sinePhase = 0;
								this.oscillate = true;
						}
					});
				}
			}
		});

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);

		// Movimiento senoide vertical mientras avanza horizontalmente
		if (this.oscillate) {
			this.sinePhase += delta * this.sineFrequency;
			this.y = this.baseY + Math.sin(this.sinePhase) * this.sineAmplitude;
		}
		const w = this.scene.scale.width;
		const h = this.scene.scale.height;
		const pad = 120;
		if (this.x < -pad || this.x > w + pad || this.y < -pad || this.y > h + pad) {
			this.destroy();
		}
	}


	killPlayer(player: any, spike: any) {
		(player as any).Die();
	}

	private baseY: number = 0;
	private sinePhase: number = 0;
	private oscillate: boolean = false;
	public sineAmplitude: number = 18;
	public sineFrequency: number = 0.01; // increment per ms

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
