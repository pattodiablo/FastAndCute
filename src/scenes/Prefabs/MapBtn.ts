// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MapBtn extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "MapBtn", frame);

		/* START-USER-CTR-CODE */
		this.setInteractive({ useHandCursor: true });

		this.on('pointerdown', () => {
			console.log("Map button clicked");
			(this.scene as any).toggleMapOverlay();
			this.stopAttentionPulse();
		});

		this.on('pointerover', () => this.stopAttentionPulse());
		this.on('pointerout', () => this.startAttentionPulse());

		this.startAttentionPulse();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private _pulseTimer?: Phaser.Time.TimerEvent;
	private _wiggleTween?: Phaser.Tweens.Tween;

	private startAttentionPulse() {
		if (this._pulseTimer) return;

		// primer wiggle con pequeño delay aleatorio
		this.scene.time.delayedCall(Phaser.Math.Between(1500, 4000), () => this.doWiggle());

		this._pulseTimer = this.scene.time.addEvent({
			delay: 10000, // cada 10s
			loop: true,
			callback: () => this.doWiggle()
		});
	}

	private stopAttentionPulse() {
		if (this._pulseTimer) { this._pulseTimer.remove(false); this._pulseTimer = undefined; }
		if (this._wiggleTween && this._wiggleTween.isPlaying()) this._wiggleTween.stop();
		this._wiggleTween = undefined;
		this.setAngle(0);
	}

	private doWiggle() {
		if (this._wiggleTween && this._wiggleTween.isPlaying()) return;
		this._wiggleTween = this.scene.tweens.add({
			targets: this,
			angle: 10,          // gira a la derecha
			duration: 90,
			ease: 'Sine.Out',
			yoyo: true,
			repeat: 5,          // izquierda/derecha varias veces
			onComplete: () => {
				this._wiggleTween = undefined;
				this.setAngle(0);
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
