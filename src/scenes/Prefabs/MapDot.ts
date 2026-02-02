// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MapDot extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// mapDot
		const mapDot = scene.add.image(0, 0, "MapDot");
		this.add(mapDot);

		// mapSelector
		const mapSelector = scene.add.image(0, -34, "MapSelector");
		this.add(mapSelector);

		this.mapDot = mapDot;
		this.mapSelector = mapSelector;
		// awake handler
		this.scene.events.once("scene-awake", () => this.awake());

		/* START-USER-CTR-CODE */
		this.mapDot.setTint(0x9e9e9e);
		this.setAlpha(0.4);

		this.mapSelector.setVisible(false);

		// Interactividad solo si IsDotActive es true
	

		const over = () => {
			this.mapSelector.setVisible(true);
			// efecto suave: escala y quitar tint
			this.scene.tweens.killTweensOf(this.mapDot);
			this.scene.tweens.add({
				targets: this.mapDot,
				scale: 1.08,
				duration: 150,
				ease: 'Quad.Out'
			});
			this.mapDot.clearTint();
		};

		const out = () => {
			this.mapSelector.setVisible(false);
			this.scene.tweens.killTweensOf(this.mapDot);
			this.scene.tweens.add({
				targets: this.mapDot,
				scale: 1,
				duration: 150,
				ease: 'Quad.Out'
			});
			if (this.IsDotActive) {
				this.mapDot.clearTint();
				this.setAlpha(1);
			} else {
				this.mapDot.setTint(0x9e9e9e);
				this.setAlpha(0.4);
			}
		};

		this.mapDot.on('pointerover', over);
		this.mapDot.on('pointerout', out);
		// en touch también mostrar al tocar
		this.mapDot.on('pointerdown', () => {
			if (!this.IsDotActive) return;

			const targetKey = "Level" + this.Level;
			const currentKey = this.scene.registry.get('LastActiveSceneKey') as string | undefined;
			if (currentKey && currentKey === targetKey) {
				return;
			}

			this.showConfirmPanel(targetKey, () => {
				// Persistir el nivel destino como escena activa
				try { this.scene.registry.set('LastActiveSceneKey', targetKey); } catch {}

				// Mover al MapPlayer inmediatamente al dot seleccionado
				const maybePlayer = (this.scene as any)?.mapPlayer as Phaser.GameObjects.Image | undefined;
				if (maybePlayer) {
					maybePlayer.x = this.x;
					maybePlayer.y = this.y - 20;
					(maybePlayer as any)?.startFloating?.(this.y);
				}

				// Detener cualquier música/FX sonando del nivel anterior
				this.scene.sound.stopAll();

				// (Opcional) Dormir otros niveles activos pero conservar su estado en memoria
				const mgr = this.scene.game.scene as Phaser.Scenes.SceneManager;
				const actives = (mgr.getScenes ? mgr.getScenes(true) : []) as Phaser.Scene[];
				for (const s of actives) {
					const key = (s as any)?.sys?.settings?.key as string;
					if (key && key.startsWith('Level') && key !== targetKey) {
						try { this.scene.scene.sleep(key); } catch {}
					}
				}

				// Iniciar el nivel seleccionado
				this.scene.scene.start(targetKey);
			});
		});

		// Limpiar listeners si se destruye el container
		this.once(Phaser.GameObjects.Events.DESTROY, () => {
			this.mapDot.off('pointerover', over);
			this.mapDot.off('pointerout', out);
			this.mapDot.off('pointerdown');
			this.confirmPanel?.destroy(true);
		});
		/* END-USER-CTR-CODE */
	}

	public mapDot: Phaser.GameObjects.Image;
	public mapSelector: Phaser.GameObjects.Image;
	public Level: number = 1;
	public IsDotActive: boolean = false;
	private confirmPanel?: Phaser.GameObjects.Container;
	private confirmTitle?: Phaser.GameObjects.Text;
	private confirmYesBtn?: Phaser.GameObjects.Image;
	private confirmNoBtn?: Phaser.GameObjects.Image;
	private confirmBlocker?: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */

	awake() {
	if (this.IsDotActive) {
			console.log("MapDot is active, enabling interactivity.");
			this.mapDot.setInteractive({ useHandCursor: true });
					this.mapDot.setTint(0xffffff);
		this.setAlpha(1);

		} else {
			console.log("MapDot is inactive, disabling interactivity.");
			this.mapDot.disableInteractive();
			this.mapSelector.setVisible(false);
		}
		// Write your code here.
	}

	private showConfirmPanel(targetKey: string, onConfirm: () => void) {
		const panel = this.ensureConfirmPanel();
		if (!panel || !this.confirmTitle || !this.confirmYesBtn || !this.confirmNoBtn) {
			onConfirm();
			return;
		}

		this.confirmTitle.setText(`¿Ir al Nivel ${this.Level}?`);
		panel.setVisible(true);
		panel.alpha = 0;
		panel.setDepth(10_000);
		this.scene.children.bringToTop(panel);
		this.scene.tweens.add({ targets: panel, alpha: 1, duration: 150, ease: 'Quad.Out' });

		const hidePanel = () => {
			this.scene.tweens.add({
				targets: panel,
				alpha: 0,
				duration: 120,
				ease: 'Quad.In',
				onComplete: () => panel.setVisible(false)
			});
		};

		this.confirmYesBtn.removeAllListeners('pointerup');
		this.confirmNoBtn.removeAllListeners('pointerup');
		this.confirmYesBtn.removeAllListeners('pointerdown');
		this.confirmNoBtn.removeAllListeners('pointerdown');
		this.confirmBlocker?.removeAllListeners('pointerup');

		const confirmHandler = () => {
			hidePanel();
			onConfirm();
		};

		this.confirmYesBtn.on('pointerup', confirmHandler);
		this.confirmYesBtn.on('pointerdown', confirmHandler);
		this.confirmNoBtn.on('pointerup', hidePanel);
		this.confirmNoBtn.on('pointerdown', hidePanel);
	}

	private ensureConfirmPanel() {
		if (this.confirmPanel) {
			return this.confirmPanel;
		}

		const { width, height } = this.scene.scale;
		const panel = this.scene.add.container(width * 0.5, height * 0.5);
		panel.setVisible(false);

		const blocker = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.35);
		blocker.setOrigin(0.5, 0.5);
		blocker.setInteractive();

		const makeRoundedBox = (w: number, h: number, radius: number, fill: number, fillAlpha: number, stroke: number, strokeWidth: number) => {
			const g = this.scene.add.graphics();
			g.fillStyle(fill, fillAlpha);
			g.lineStyle(strokeWidth, stroke, 1);
			g.fillRoundedRect(-w * 0.5, -h * 0.5, w, h, radius);
			g.strokeRoundedRect(-w * 0.5, -h * 0.5, w, h, radius);
			return g;
		};

		const bg = makeRoundedBox(380, 220, 20, 0xffd447, 0.96, 0x7e3ab6, 6);

		const textStyle = {
			color: '#ffffff',
			fontFamily: 'Arial',
			fontSize: '28px',
			stroke: '#7e3ab6',
			strokeThickness: 6,
			align: 'center'
		};
		const title = this.scene.add.text(0, -50, '¿Cambiar de nivel?', textStyle);
		title.setOrigin(0.5, 0.5);

		const btnWidth = 136;
		const btnHeight = 86;
		const btnSpacing = 180;

		const makeBtnTexture = (key: string, label: string) => {
			if (this.scene.textures.exists(key)) return key;
			const rt = this.scene.add.renderTexture(0, 0, btnWidth, btnHeight);
			const shape = makeRoundedBox(btnWidth, btnHeight, 16, 0xffffff, 1, 0x7e3ab6, 4);
			rt.draw(shape, btnWidth * 0.5, btnHeight * 0.5);
			shape.destroy();
			const txt = this.scene.add.text(0, 0, label, {
				...textStyle,
				fontSize: '24px',
				strokeThickness: 4
			});
			txt.setOrigin(0.5, 0.5);
			rt.draw(txt, btnWidth * 0.5, btnHeight * 0.5);
			txt.destroy();
			rt.saveTexture(key);
			rt.destroy();
			return key;
		};

		const yesKey = makeBtnTexture('confirm_yes_btn', 'YES');
		const noKey = makeBtnTexture('confirm_no_btn', 'NO');

		const yesBtn = this.scene.add.image(-btnSpacing * 0.5, 45, yesKey);
		yesBtn.setOrigin(0.5, 0.5);
		yesBtn.setDisplaySize(btnWidth, btnHeight);
		yesBtn.setInteractive({ useHandCursor: true });
		yesBtn.on('pointerover', () => yesBtn.setScale(1.05));
		yesBtn.on('pointerout', () => yesBtn.setScale(1));

		const noBtn = this.scene.add.image(btnSpacing * 0.5, 45, noKey);
		noBtn.setOrigin(0.5, 0.5);
		noBtn.setDisplaySize(btnWidth, btnHeight);
		noBtn.setInteractive({ useHandCursor: true });
		noBtn.on('pointerover', () => noBtn.setScale(1.05));
		noBtn.on('pointerout', () => noBtn.setScale(1));

		panel.add([blocker, bg, title, yesBtn, noBtn]);
		panel.setDepth(10_000);

		this.confirmPanel = panel;
		this.confirmTitle = title;
		this.confirmYesBtn = yesBtn;
		this.confirmNoBtn = noBtn;
		this.confirmBlocker = blocker;

		return panel;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
