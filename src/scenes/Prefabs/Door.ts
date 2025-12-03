// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Door {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Door extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "DoorShine", frame ?? "DoorShine0018.png");

		this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 92, 136), Phaser.Geom.Rectangle.Contains);
		scene.physics.add.existing(this, false);
		this.body.moves = false;
		this.body.allowGravity = false;
		this.body.allowDrag = false;
		this.body.allowRotation = false;
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setSize(92, 136, false);

		/* START-USER-CTR-CODE */
        // Inicia el loop de brillo
       // this.startShineLoop();
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
        /* END-USER-CTR-CODE */
	}

	public IsOpen: boolean = false;
	public shineTimer!: any;
	public IsVisible: boolean = false;
    public AppearDoorSound?: Phaser.Sound.BaseSound;
	/* START-USER-CODE */

    create() {
this.AppearDoorSound = this.scene.sound.add("DoorAppear");
		
				(this.scene as any).addFx(this.AppearDoorSound);



        this.scene.physics.add.overlap((this.scene as any).player, this, this.OpenDoor, undefined, this);

        if (!this.IsVisible) {
            this.setVisible(false);
            this.body.enable = false;
        }
    }

    OpenDoor(player: any, door: any) {
        if (this.IsOpen) return; // Solo permite abrir una vez
        this.IsOpen = true;
        this.play("OpenDoor");

        (player as any).CompleteLevel(this.x, this.y);
    }

    AppearDoor() {
        console.log("Aparece la puerta");
        if (this.IsVisible) return; // Ya es visible
        this.IsVisible = true;
        this.setVisible(true);
        this.body.enable = true;
        this.play("DoorAppear");
		this.AppearDoorSound?.play();
        // Espera a que termine la animación DoorAppear para iniciar el brillo
        this.once("animationcomplete-DoorAppear", () => {
            if (!this.IsOpen) {
                this.startShineLoop();
            }
        });
    }   

    private startShineLoop() {
        if (this.shineTimer) return;

        const scheduleShine = () => {
            if (this.IsOpen) {
                // Si la puerta se abre, detén el timer
                if (this.shineTimer) {
                    this.shineTimer.remove();
                    this.shineTimer = undefined;
                }
                return;
            }

            // Reproduce la animación DoorShine si existe
            this.play("DoorShine");

            // Espera a que termine la animación para volver al frame base y programar el siguiente brillo
            this.once("animationcomplete-DoorShine", () => {
                this.setTexture("DoorShine"); // Asegura la textura base
                this.setFrame(0); // O el frame base si usas atlas/spritesheet
                this.shineTimer = this.scene.time.delayedCall(
                    Phaser.Math.Between(5000, 10000),
                    scheduleShine,
                    [],
                    this
                );
            });
        };

        scheduleShine();
    }


    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
