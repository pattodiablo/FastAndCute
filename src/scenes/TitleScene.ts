
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TitleScene extends Phaser.Scene {

	constructor() {
		super("TitleScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// backGround
		const backGround = this.add.image(0, 0, "BackGround");
		backGround.setOrigin(0, 0);

		// bubble
		const bubble = this.add.image(947, 559, "Bubble");

		// titleCloud1
		const titleCloud1 = this.add.image(900, 537, "TitleCloud1");

		// titleCloud2
		const titleCloud2 = this.add.image(781, 550, "TitleCloud2");

		// titleCloud
		const titleCloud = this.add.image(134, 541, "TitleCloud1");
		titleCloud.scaleX = -1;

		// titleCloud_1
		const titleCloud_1 = this.add.image(283, 575, "TitleCloud2");
		titleCloud_1.scaleX = -1;

		// textTitle
		const textTitle = this.add.image(530, 269, "TextTitle");

		// readyButton
		const readyButton = this.add.image(534, 461, "ReadyButton");

		// intro_Star
		const intro_Star = this.add.image(922, 214, "Intro_Star");

		// intro_Star_1
		const intro_Star_1 = this.add.image(122, 142, "Intro_Star");
		intro_Star_1.angle = -52.99999999999994;

		// mishiko
		const mishiko = this.add.image(317, 464, "Mishiko");
		mishiko.scaleX = 0.5;
		mishiko.scaleY = 0.5;

		this.backGround = backGround;
		this.bubble = bubble;
		this.titleCloud1 = titleCloud1;
		this.titleCloud2 = titleCloud2;
		this.titleCloud = titleCloud;
		this.titleCloud_1 = titleCloud_1;
		this.textTitle = textTitle;
		this.readyButton = readyButton;
		this.intro_Star = intro_Star;
		this.intro_Star_1 = intro_Star_1;
		this.mishiko = mishiko;

		this.events.emit("scene-awake");
	}

	private backGround!: Phaser.GameObjects.Image;
	private bubble!: Phaser.GameObjects.Image;
	private titleCloud1!: Phaser.GameObjects.Image;
	private titleCloud2!: Phaser.GameObjects.Image;
	private titleCloud!: Phaser.GameObjects.Image;
	private titleCloud_1!: Phaser.GameObjects.Image;
	private textTitle!: Phaser.GameObjects.Image;
	private readyButton!: Phaser.GameObjects.Image;
	private intro_Star!: Phaser.GameObjects.Image;
	private intro_Star_1!: Phaser.GameObjects.Image;
	private mishiko!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.startFadeIn();
		this.initIntroStars();
		this.initMishiko();
		this.startCloudFloat();
		this.startTitleIntro();
		this.startReadyIntro();
		this.wireReadyButton();
		this.startBubbleRise();
	}

	private startFadeIn() {
		const fadeRect = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 1)
			.setOrigin(0, 0)
			.setScrollFactor(0)
			.setDepth(2000);

		this.tweens.add({
			targets: fadeRect,
			alpha: 0,
			duration: 1500,
			ease: "Quad.Out",
			onComplete: () => fadeRect.destroy()
		});
	}

	private initMishiko() {
		this.mishiko.setData("baseScaleX", this.mishiko.scaleX || 1);
		this.mishiko.setData("baseScaleY", this.mishiko.scaleY || 1);
		this.mishiko.setScale(0);
		this.mishiko.setAlpha(0);
	}

	private initIntroStars() {
		const stars = [this.intro_Star, this.intro_Star_1];
		stars.forEach((star) => {
			star.setData("baseScaleX", star.scaleX || 1);
			star.setData("baseScaleY", star.scaleY || 1);
			star.setScale(0);
			star.setAlpha(0);
		});
	}

	private startTitleIntro() {
		const targetY = this.textTitle.y;
		const baseScaleX = this.textTitle.scaleX || 1;
		const baseScaleY = this.textTitle.scaleY || 1;
		const startY = -this.textTitle.height - 40; // arranca más arriba para que no se vean los "pies"

		// Arranca fuera de pantalla
		this.textTitle.y = startY;
		this.textTitle.scale = baseScaleX * 1; // mantiene escala inicial

		this.time.delayedCall(1000, () => {
			this.tweens.add({
				targets: this.textTitle,
				y: targetY,
				scaleX: baseScaleX * 1.04,
				scaleY: baseScaleY * 1.04,
				duration: 950,
				ease: "Back.Out",
				onComplete: () => {
					this.tweens.add({
						targets: this.textTitle,
						scaleX: baseScaleX * 1.03,
						scaleY: baseScaleY * 1.03,
						duration: 1800,
						yoyo: true,
						repeat: -1,
						ease: "Sine.InOut"
					});
					this.startStarsIntro();
				}
			});
		});
	}

	private startStarsIntro() {
		const stars = [this.intro_Star, this.intro_Star_1];
		stars.forEach((star) => {
			const baseScaleX = (star.getData("baseScaleX") as number) || star.scaleX || 1;
			const baseScaleY = (star.getData("baseScaleY") as number) || star.scaleY || 1;
			const startScale = 0;
			const targetScale = baseScaleX;
			const randomDelay = Phaser.Math.Between(0, 180);
			star.setScale(startScale);
			star.alpha = 0;

			this.time.delayedCall(150 + randomDelay, () => {
				this.tweens.add({
					targets: star,
					scaleX: targetScale * 1.15,
					scaleY: targetScale * 1.15,
					alpha: 1,
					duration: 520,
					ease: "Back.Out",
					onComplete: () => {
						this.tweens.add({
							targets: star,
							scaleX: targetScale,
							scaleY: targetScale,
							duration: 220,
							ease: "Quad.Out"
						});

						const swing = Phaser.Math.FloatBetween(3, 7);
						const duration = Phaser.Math.Between(2000, 3200);
						this.tweens.add({
							targets: star,
							angle: `+=${swing}`,
							duration,
							ease: "Sine.InOut",
							yoyo: true,
							repeat: -1
						});
					}
				});
			});
		});
	}

	private readyShakeActive = false;
	private mishikoFloatTween?: Phaser.Tweens.Tween;

	private startReadyIntro() {
		const targetY = this.readyButton.y;
		const baseScaleX = this.readyButton.scaleX || 1;
		const baseScaleY = this.readyButton.scaleY || 1;
		const startY = -this.readyButton.height - 20;

		this.readyButton.y = startY;
		this.readyButton.scale = baseScaleX * 1;

		this.time.delayedCall(1200, () => {
			this.tweens.add({
				targets: this.readyButton,
				y: targetY,
				scaleX: baseScaleX * 1.06,
				scaleY: baseScaleY * 1.06,
				duration: 900,
				ease: "Back.Out",
				onComplete: () => {
					this.readyButton.setScale(baseScaleX, baseScaleY);
					this.startReadyShakeLoop(baseScaleX, baseScaleY);
					this.startMishikoIntro();
				}
			});
		});
	}

	private startReadyShakeLoop(baseScaleX: number, baseScaleY: number) {
		this.time.addEvent({
			delay: 6000,
			loop: true,
			callback: () => {
				if (this.readyShakeActive) return;
				this.readyShakeActive = true;
				this.tweens.add({
					targets: this.readyButton,
					y: this.readyButton.y - 6,
					scaleX: baseScaleX * 1.04,
					scaleY: baseScaleY * 1.04,
					duration: 120,
					yoyo: true,
					repeat: 2,
					ease: "Quad.Out",
					onComplete: () => {
						this.readyButton.setScale(baseScaleX, baseScaleY);
						this.readyShakeActive = false;
					}
				});
			}
		});
	}

	private wireReadyButton() {
		this.readyButton.setInteractive({ useHandCursor: true });
		this.readyButton.on(Phaser.Input.Events.POINTER_UP, () => {
			this.scene.start("Level1");
		});
	}

	private startMishikoIntro() {
		const targetY = this.mishiko.y;
		const targetX = this.mishiko.x;
		const baseScaleX = (this.mishiko.getData("baseScaleX") as number) || this.mishiko.scaleX || 1;
		const baseScaleY = (this.mishiko.getData("baseScaleY") as number) || this.mishiko.scaleY || 1;
		const startY = this.scale.height + this.mishiko.height;

		this.mishiko.y = startY;
		this.mishiko.x = targetX;
		this.mishiko.alpha = 0;
		this.mishiko.setScale(0);

		this.tweens.add({
			targets: this.mishiko,
			y: targetY,
			alpha: 1,
			scaleX: baseScaleX * 1.02,
			scaleY: baseScaleY * 1.02,
			duration: 1000,
			ease: "Back.Out",
			onComplete: () => {
				this.mishiko.setScale(baseScaleX, baseScaleY);
				this.startMishikoFloat();
			}
		});
	}

	private startMishikoFloat() {
		this.mishikoFloatTween?.stop();
		this.mishikoFloatTween = this.tweens.add({
			targets: this.mishiko,
			y: "+=8",
			duration: 1800,
			ease: "Sine.InOut",
			yoyo: true,
			repeat: -1
		});
	}

	private startCloudFloat() {
		const float = (cloud: Phaser.GameObjects.Image, amp: number, duration: number, delay: number = 0) => {
			const baseScaleX = cloud.scaleX || 1;
			const baseScaleY = cloud.scaleY || 1;
			this.tweens.add({
				targets: cloud,
				scaleX: baseScaleX * (1 + amp),
				scaleY: baseScaleY * (1 + amp),
				duration,
				ease: "Sine.InOut",
				yoyo: true,
				repeat: -1,
				delay
			});
		};

		float(this.titleCloud1, 0.06, 2600, 0);
		float(this.titleCloud2, 0.05, 2800, 200);
		float(this.titleCloud, 0.05, 2400, 120);
		float(this.titleCloud_1, 0.04, 3000, 320);
	}

	private startBubbleRise() {
		const total = 8;
		const bubbles: Phaser.GameObjects.Image[] = [this.bubble];
		for (let i = 1; i < total; i++) {
			const clone = this.add.image(this.bubble.x, this.bubble.y, this.bubble.texture.key);
			bubbles.push(clone);
		}

		bubbles.forEach((b, idx) => this.launchBubble(b, idx * 200));
	}

	private launchBubble(bubble: Phaser.GameObjects.Image, delay: number = 0) {
		const padding = 40;
		const startX = Phaser.Math.Between(padding, this.scale.width - padding);
		const startY = this.scale.height + Phaser.Math.Between(120, 220);
		const targetY = -160;
		const scale = Phaser.Math.FloatBetween(0.5, 1);
		const duration = Phaser.Math.Between(5000, 9500);

		bubble.setPosition(startX, startY);
		bubble.setScale(scale);
		bubble.setAlpha(0.9);

		this.tweens.add({
			targets: bubble,
			y: targetY,
			duration,
			ease: "Sine.InOut",
			delay,
			onComplete: () => this.launchBubble(bubble)
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
