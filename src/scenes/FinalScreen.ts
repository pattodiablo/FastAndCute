
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FinalScreen extends Phaser.Scene {

	constructor() {
		super("FinalScreen");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// mapBg
		this.add.image(516, 288, "MapBg");

		// finalScreenBiomas
		const finalScreenBiomas = this.add.image(514, 336, "FinalScreenBiomas");
		this.finalScreenBiomas = finalScreenBiomas;

		// finalScreenCarrots
		const finalScreenCarrots = this.add.image(924, 109, "FinalScreenCarrots");
		this.finalScreenCarrots = finalScreenCarrots;

		// finalScreenEnemies
		const finalScreenEnemies = this.add.image(764, 335, "FinalScreenEnemies");
		this.finalScreenEnemies = finalScreenEnemies;

		// finalScreenFeedBack
		const finalScreenFeedBack = this.add.image(281, 496, "FinalScreenFeedBack");
		this.finalScreenFeedBack = finalScreenFeedBack;

		// finalScreenHelloCAt
		this.add.image(951, 554, "FinalScreenHelloCAt");

		// finalScreenMishiko
		const finalScreenMishiko = this.add.image(150, 121, "FinalScreenMishiko");
		this.finalScreenMishiko = finalScreenMishiko;

		// finalScreenMusic
		const finalScreenMusic = this.add.image(233, 337, "FinalScreenMusic");
		this.finalScreenMusic = finalScreenMusic;

		// finalScreenWhatsNext
		const finalScreenWhatsNext = this.add.image(758, 494, "FinalScreenWhatsNext");
		this.finalScreenWhatsNext = finalScreenWhatsNext;

		// finalScrenBigText
		const finalScrenBigText = this.add.image(515, 156, "FinalScrenBigText");
		this.finalScrenBigText = finalScrenBigText;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.setupButton(this.finalScreenFeedBack, this.finalScreenFeedBackUrl);
		this.setupButton(this.finalScreenWhatsNext, this.finalScreenWhatsNextUrl);

		// Fade in desde negro (3s) y luego entrar el texto desde arriba
		const cam = this.cameras.main;
		const targetY = this.finalScrenBigText?.y ?? 0;
		const feedBackTargetY = this.finalScreenFeedBack?.y ?? 0;
		const whatsNextTargetY = this.finalScreenWhatsNext?.y ?? 0;
		const mishikoTargetY = this.finalScreenMishiko?.y ?? 0;
		const carrotsTargetY = this.finalScreenCarrots?.y ?? 0;
		const offscreenY = cam.height + 150;
		const offscreenTop = -150;
		if (this.finalScrenBigText) {
			this.finalScrenBigText.y = targetY - 300;
		}
		if (this.finalScreenFeedBack) {
			this.finalScreenFeedBack.y = offscreenY;
		}
		if (this.finalScreenWhatsNext) {
			this.finalScreenWhatsNext.y = offscreenY;
		}
		if (this.finalScreenMishiko) {
			this.finalScreenMishiko.y = offscreenTop;
		}
		if (this.finalScreenCarrots) {
			this.finalScreenCarrots.y = offscreenTop;
		}
		if (this.finalScreenMusic) {
			this.finalScreenMusic.setScale(0);
		}
		if (this.finalScreenBiomas) {
			this.finalScreenBiomas.setScale(0);
		}
		if (this.finalScreenEnemies) {
			this.finalScreenEnemies.setScale(0);
		}
		cam.fadeIn(3000, 0, 0, 0);
		cam.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
			this.scaleIn(this.finalScreenMusic, 0);
			this.scaleIn(this.finalScreenBiomas, 100);
			this.scaleIn(this.finalScreenEnemies, 200);
			this.slideDownAndFloat(this.finalScreenMishiko, mishikoTargetY, 300);
			this.slideDownAndFloat(this.finalScreenCarrots, carrotsTargetY, 400);
			const animateBottom = () => {
				if (this.finalScreenFeedBack) {
					this.tweens.add({
						targets: this.finalScreenFeedBack,
						y: feedBackTargetY,
						duration: 700,
						ease: "Cubic.Out"
					});
				}
				if (this.finalScreenWhatsNext) {
					this.tweens.add({
						targets: this.finalScreenWhatsNext,
						y: whatsNextTargetY,
						duration: 700,
						ease: "Cubic.Out"
					});
				}
			};
			if (this.finalScrenBigText) {
				this.tweens.add({
					targets: this.finalScrenBigText,
					y: targetY,
					duration: 800,
					ease: "Cubic.Out",
					onComplete: animateBottom
				});
			} else {
				animateBottom();
			}
		});
	}

	private slideDownAndFloat(target?: Phaser.GameObjects.Image, targetY = 0, delay = 0) {
		if (!target) return;
		this.tweens.add({
			targets: target,
			y: targetY,
			duration: 900,
			ease: "Cubic.Out",
			delay,
			onComplete: () => this.startFloat(target)
		});
	}

	private setupButton(target?: Phaser.GameObjects.Image, url?: string) {
		if (!target || !url) return;
		target.setInteractive({ useHandCursor: true });
		target.on("pointerup", () => {
			window.open(url, "_blank");
		});
		target.on("pointerover", () => {
			target.setScale(1.02);
		});
		target.on("pointerout", () => {
			target.setScale(1);
		});
	}

	private scaleIn(target?: Phaser.GameObjects.Image, delay = 0) {
		if (!target) return;
		this.tweens.add({
			targets: target,
			scale: 1,
			duration: 500,
			ease: "Back.Out",
			delay
		});
	}

	private startFloat(target: Phaser.GameObjects.Image) {
		this.tweens.add({
			targets: target,
			y: target.y + 10,
			duration: 1500,
			ease: "Sine.InOut",
			yoyo: true,
			repeat: -1
		});
	}

	private finalScrenBigText?: Phaser.GameObjects.Image;
	private finalScreenFeedBack?: Phaser.GameObjects.Image;
	private finalScreenWhatsNext?: Phaser.GameObjects.Image;
	private finalScreenMusic?: Phaser.GameObjects.Image;
	private finalScreenBiomas?: Phaser.GameObjects.Image;
	private finalScreenEnemies?: Phaser.GameObjects.Image;
	private finalScreenMishiko?: Phaser.GameObjects.Image;
	private finalScreenCarrots?: Phaser.GameObjects.Image;
	private readonly finalScreenFeedBackUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfMnw5fLpuLpUCqkLwpxr0bpkq8Dn2JfEahVpEM5EYyPSqgAw/viewform?usp=publish-editor";
	private readonly finalScreenWhatsNextUrl = "https://www.weveana.com/_files/ugd/f945bd_7bf4ae3a0e8340afbe3dca189975d8a4.pdf";

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
