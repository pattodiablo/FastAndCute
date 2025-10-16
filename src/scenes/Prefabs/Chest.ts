// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Chest extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "OpenChestanimation", frame ?? "OpenChestAnimation0001.png");

		/* START-USER-CTR-CODE */
		this.setInteractive({ useHandCursor: true });
		// Escucha el evento de pointerdown (clic/tap)
		this.on('pointerdown', () => {
			if (!this.IsOpen) {
						this.OpenChest();
			}
	
		});


		/* END-USER-CTR-CODE */
	}

	public IsOpen: boolean = false;

	/* START-USER-CODE */

		OpenChest() {
			// Aquí va la lógica para abrir el cofre, por ejemplo:

			
			this.play("OpenChest");
			this.once("animationcomplete-OpenChest", () => {
				// Aquí va la lógica para abrir el cofre (por ejemplo, mostrar el premio, etc.)
				(this.scene as any).player.startMoving(); // Llama al método startMoving del jugador
				this.IsOpen = true;
				this.scene.add.particles(0, 0, 'BubbleParticle', {
				x: this.x,
				y: this.y,
				speed: { min: 100, max: 250 },
				angle: { min: 0, max: 360 },
				lifespan: { min: 1000, max: 4000 },
				scale: { start: 0, end: 1 },
				quantity: 20,
				maxParticles: 20,
				frequency: 0,
				gravityY: -100

			});

				// Puedes agregar más lógica aquí si lo necesitas
			});
		}

		public resetChest() {
			this.IsOpen = false;
			this.play("CloseChest");
		}
	/* END-USER-CODE */
}



/* END OF COMPILED CODE */

// You can write more code here
