
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Star from "./Star";
/* END-USER-IMPORTS */

export default class CursorTutorial extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "HandClick", frame ?? "ClickHand0001.png");

		this.play("");

		/* START-USER-CTR-CODE */
		// Posición al centro si no se pasó coordenada
		if (x === undefined && y === undefined) {
			this.setPosition(this.scene.scale.width * 0.5, this.scene.scale.height * 0.5);
		}
		// Intro: espera 2s y aparece con escala 0->1, luego flota
		this.setScale(0);
		this.setAlpha(0);
		this.createInstructionText();
		this.scene.time.delayedCall(2000, () => {
			this.scene.tweens.add({
				targets: this,
				scale: 1,
				alpha: 1,
				duration: 400,
				ease: "Back.Out",
				onComplete: () => {
					this.startFloat();
					this.scene.time.delayedCall(2000, () => this.moveToChestOrigin());
				}
			});
		});

		// Espera a que el jugador abra el cofre para mover el cursor a la siguiente posición
		this.scene.events.once("chest-opened", this.handleChestOpened);
		this.scene.events.on("star-collected", this.handleStarCollected);
		this.scene.events.on("player-charged", this.handlePlayerCharged);

		this.once(Phaser.GameObjects.Events.DESTROY, () => {
			const events = this.scene?.events;
			events?.off("chest-opened", this.handleChestOpened);
			events?.off("star-collected", this.handleStarCollected);
			events?.off("player-charged", this.handlePlayerCharged);
			this.instructionText?.destroy();
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private floatTween?: Phaser.Tweens.Tween;
	private instructionText?: Phaser.GameObjects.Text;
	private hasHandledChestOpen: boolean = false;
	private hasHandledStar1: boolean = false;
	private waitingForSecondStar: boolean = false;
	private waitingForCharge: boolean = false;
	private readonly handleChestOpened = () => this.onChestOpened();
	private readonly handleStarCollected = (star: any) => this.onStarCollected(star);
	private readonly handlePlayerCharged = () => this.onPlayerCharged();

	private startFloat() {
		if (!this.scene) return;
		// Movimiento flotante muy lento relativo a la posición actual
		this.floatTween?.stop();
		this.floatTween = this.scene.tweens.add({
			targets: this,
			y: "-=8",
			duration: 1500,
			ease: "Sine.InOut",
			yoyo: true,
			repeat: -1,
		});
	}

	private moveToChestOrigin() {
		if (!this.scene) return;
		const chest = (this.scene as any)?.chest;
		if (!chest || typeof chest.x !== "number" || typeof chest.y !== "number") return;

		this.floatTween?.stop();
		this.scene.tweens.add({
			targets: this,
			x: chest.x,
			y: chest.y+30,
			duration: 900,
			ease: "Quad.InOut",
			onComplete: () => {
				this.playClickAnimation(false);
			}
		});
	}

	private playClickAnimation(resumeFloat: boolean) {
		if (!this.anims || !this.scene.anims.exists("HandClick")) {
			if (resumeFloat) this.startFloat();
			return;
		}

		this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
			if (resumeFloat) this.startFloat();
		});
		this.play("HandClick", true);
	}

	private onChestOpened() {
		if (this.hasHandledChestOpen) return;
		this.hasHandledChestOpen = true;
		this.updateInstruction(2);

		// Detener cualquier flotado o animación para moverse al nuevo punto
		this.floatTween?.stop();
		this.anims?.stop();
		this.setFrame("ClickHand0001.png");

		const sceneAny = this.scene as any;
		if (!sceneAny) return;
		const star = sceneAny.star1;
		if (!star || typeof star.x !== "number" || typeof star.y !== "number") return;

		this.scene.tweens.add({
			targets: this,
			x: star.x,
			y: star.y,
			duration: 900,
			ease: "Quad.InOut",
			onComplete: () => this.playClickAnimation(true)
		});
	}

	private onStarCollected(star: any) {
		const sceneAny = this.scene as any;
		if (!sceneAny) return;
		const sceneStar1 = sceneAny.star1;
		const sceneStar2 = sceneAny.star2;

		if (!sceneStar1 || !sceneStar2) return;

		// Primer pick: mueve la mano hacia la segunda estrella
		if (!this.hasHandledStar1 && star === sceneStar1) {
			if (typeof sceneStar2.x !== "number" || typeof sceneStar2.y !== "number") return;
			this.hasHandledStar1 = true;
			this.waitingForSecondStar = true;
			this.floatTween?.stop();
			this.anims?.stop();
			this.setFrame("ClickHand0001.png");

			this.scene.tweens.add({
				targets: this,
				x: sceneStar2.x,
				y: sceneStar2.y,
				duration: 900,
				ease: "Quad.InOut",
				onComplete: () => this.playClickAnimation(true)
			});
			return;
		}

		// Segundo pick: ahora sí arranca la animación de mantener
		if (this.waitingForSecondStar && star === sceneStar2) {
			this.waitingForSecondStar = false;
			this.updateInstruction(3);
			this.floatTween?.stop();
			this.anims?.stop();
			this.setFrame("ClickHand0001.png");
			this.playHoldAnimation();
		}

		// Si ya no quedan estrellas, dirigir la mano a la puerta
		if (this.isLastStar(star)) {
			this.updateInstruction(5);
			const doorTarget = this.getDoorTarget();
			if (!doorTarget) return;

			this.floatTween?.stop();
			this.anims?.stop();
			this.setFrame("ClickHand0001.png");

			this.scene.tweens.add({
				targets: this,
				x: doorTarget.x,
				y: doorTarget.y,
				duration: 900,
				ease: "Quad.InOut",
				onComplete: () => this.playClickAnimation(false)
			});
		}
	}

	private playHoldAnimation() {
		this.waitingForCharge = true;
		if (!this.anims || !this.scene.anims.exists("HandHold")) {
			this.startFloat();
			return;
		}

		this.play({ key: "HandHold", repeat: -1 } as any, true);
		this.startFloat();
	}

	private findLastStar(): Star | undefined {
		const group = (this.scene as any).starsGroup as Phaser.GameObjects.Group | undefined;
		if (group) {
			const remaining = group.getChildren().filter((child: any) => child.active && !(child as any).isCollected);
			if (remaining.length > 0) {
				return remaining.reduce((best: any, current: any) => {
					if (!best) return current;
					return current.x > best.x ? current : best;
				}, undefined) as Star;
			}
		}

		const fallback = (this.scene as any).star_2 || (this.scene as any).star2;
		if (fallback && typeof fallback.x === "number" && typeof fallback.y === "number") {
			return fallback as Star;
		}

		return undefined;
	}

	private onPlayerCharged() {
		if (!this.waitingForCharge) return;
		this.waitingForCharge = false;
		this.updateInstruction(4);

		const sceneAny = this.scene as any;
		if (!sceneAny) return;

		const lastStar = this.findLastStar();
		if (!lastStar) {
			this.startFloat();
			return;
		}

		this.floatTween?.stop();
		this.anims?.stop();
		this.setFrame("ClickHand0001.png");

		this.scene.tweens.add({
			targets: this,
			x: lastStar.x,
			y: lastStar.y,
			duration: 900,
			ease: "Quad.InOut",
			onComplete: () => this.playClickAnimation(false)
		});
	}

	private isLastStar(star: any): boolean {
		const group = (this.scene as any).starsGroup as Phaser.GameObjects.Group | undefined;
		if (!group) return false;
		const remaining = group.getChildren().filter((child: any) => child.active && !(child as any).isCollected && child !== star);
		return remaining.length === 0;
	}

	private getDoorTarget(): { x: number; y: number } | undefined {
		const door = (this.scene as any).door || (this.scene as any).doorOrigin;
		if (door && typeof door.x === "number" && typeof door.y === "number") {
			return { x: door.x, y: door.y };
		}
		return undefined;
	}

	private createInstructionText() {
		const { width, height } = this.scene.scale;
		this.instructionText = this.scene.add.text(width * 0.5, height * 0.35, this.getInstruction(1), {
			fontFamily: "Arial",
			fontSize: "26px",
			color: "#ffffff",
			align: "center",
			wordWrap: { width: width * 0.7 }
		}).setOrigin(0.5, 0.5).setDepth(2000);
	}

	private getInstruction(step: number): string {
		switch (step) {
			case 1: return "Step 1: Open the chest";
			case 2: return "Step 2: Collect two stars";
			case 3: return "Step 3: Find the third star and use Charge";
			case 4: return "Step 4: Collect the last star";
			case 5: return "Step 5: Enter the door";
			default: return "";
		}
	}

	private updateInstruction(step: number) {
		if (!this.instructionText) return;
		this.instructionText.setText(this.getInstruction(step));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
