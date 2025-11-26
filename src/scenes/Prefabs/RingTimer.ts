// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import SpinePlayer from "./SpinePlayer";

/* END-USER-IMPORTS */

export default class RingTimer extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "RingLoad", frame ?? "Ring20012.png");

		this.scaleX = 0.4322736032890191;
		this.scaleY = 0.4322736032890191;
		this.play("RingLoad");

		/* START-USER-CTR-CODE */
		// Al terminar RingLoad reproducir inmediatamente RingStay
		this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim: Phaser.Animations.Animation) => {
			if (anim.key === "RingLoad") {
				this.play("RingStay");
			}
		});

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private followTarget?: SpinePlayer;
	private followLerp: number = 0.05;
	public attachTo(player: SpinePlayer, lerp: number = 0.15) {
		this.followTarget = player;
		this.followLerp = Phaser.Math.Clamp(lerp, 0.01, 0.95);
		this.x = player.x;
		this.y = player.y;
	}
	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);
		if (!this.followTarget || !this.followTarget.active) return;

		// Lerp suave hacia la posición del jugador
		this.x = Phaser.Math.Linear(this.x, this.followTarget.x, this.followLerp);
		this.y = Phaser.Math.Linear(this.y, this.followTarget.y, this.followLerp);

		// (Opcional) si quieres rotar lentamente
		// this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, this.followTarget.rotation, 0.04);
	}
	destroy(fromScene?: boolean) {
		this.followTarget = undefined;
		super.destroy(fromScene);
	}

	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
