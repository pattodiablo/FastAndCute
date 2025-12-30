// You can write more code here

/* START OF COMPILED CODE */

import Chest from "./Prefabs/Chest";
import Door from "./Prefabs/Door";
import SpinePlayer from "./Prefabs/SpinePlayer";
import FxButton from "./Prefabs/FxButton";
import MusicBtn from "./Prefabs/MusicBtn";
import MapBtn from "./Prefabs/MapBtn";
import HomePlayer from "./Prefabs/HomePlayer";
import { SpineGameObject } from "@esotericsoftware/spine-phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BaseEscene extends Phaser.Scene {

	editorCreate(): void {

		// gameBg
		const gameBg = this.add.tileSprite(-48, -22, 1031, 580, "bg1");
		gameBg.scaleX = 1.1;
		gameBg.scaleY = 1.1;
		gameBg.setOrigin(0, 0);

		// bg2
		const bg2 = this.add.tileSprite(-215, 47, 1500, 580, "bg2");
		bg2.setOrigin(0, 0);

		// bg3
		const bg3 = this.add.tileSprite(-215, 57, 1500, 580, "bg3");
		bg3.setOrigin(0, 0);

		// bg4
		const bg4 = this.add.tileSprite(-223, 108, 1500, 580, "bg4");
		bg4.setOrigin(0, 0);

		// vinete
		const vinete = this.add.image(516, 270, "Vinete");
		vinete.blendMode = Phaser.BlendModes.MULTIPLY;

		// Chest
		const chest = new Chest(this, 133, 192);
		this.add.existing(chest);

		// Door
		const door = new Door(this, 938, 177);
		this.add.existing(door);

		// Player
		const player = new SpinePlayer(this, this.spine, 133, 149);
		this.add.existing(player);

		// frontLayer
		this.add.image(511, 568, "FrontLayer");

		// fxON
		const fxON = new FxButton(this, 987, 46);
		this.add.existing(fxON);

		// musicON
		const musicON = new MusicBtn(this, 1179, 46);
		this.add.existing(musicON);

		// mapBtn
		const mapBtn = new MapBtn(this, 44, 46);
		this.add.existing(mapBtn);

		// carboardEffect
		const carboardEffect = this.add.image(0, 0, "CarboardEffect");
		carboardEffect.blendMode = Phaser.BlendModes.MULTIPLY;
		carboardEffect.setOrigin(0, 0);
		carboardEffect.visible = false;

		// curtain1
		const curtain1 = this.add.image(515, -218, "Curtain1");

		// curtain2
		const curtain2 = this.add.image(515, 743, "Curtain2");

		// HomePlayer
		const homePlayer = new HomePlayer(this, 61, 543);
		this.add.existing(homePlayer);

		this.gameBg = gameBg;
		this.bg2 = bg2;
		this.bg3 = bg3;
		this.bg4 = bg4;
		this.vinete = vinete;
		this.chest = chest;
		this.door = door;
		this.player = player;
		this.fxON = fxON;
		this.musicON = musicON;
		this.mapBtn = mapBtn;
		this.carboardEffect = carboardEffect;
		this.curtain1 = curtain1;
		this.curtain2 = curtain2;
		this.homePlayer = homePlayer;

		this.events.emit("scene-awake");
	}

	public gameBg!: Phaser.GameObjects.TileSprite;
	public bg2!: Phaser.GameObjects.TileSprite;
	public bg3!: Phaser.GameObjects.TileSprite;
	public bg4!: Phaser.GameObjects.TileSprite;
	public vinete!: Phaser.GameObjects.Image;
	public chest!: Chest;
	public door!: Door;
	public player!: SpinePlayer;
	public fxON!: FxButton;
	public musicON!: MusicBtn;
	public mapBtn!: MapBtn;
	public carboardEffect!: Phaser.GameObjects.Image;
	public curtain1!: Phaser.GameObjects.Image;
	public curtain2!: Phaser.GameObjects.Image;
	public homePlayer!: HomePlayer;

	/* START-USER-CODE */

    public nextLevel: string = "Level";
	private _mapVisible = false;
	private _mapFromTop = true; // true: entra por arriba; false: por abajo

	public collidingEnemies: Phaser.GameObjects.GameObject[] = [];
	public enemiesGroup!: Phaser.Physics.Arcade.Group;

    BaseCreate(): void {

		
		this.collidingEnemies = [];
		// gameBg
		const gameBg = this.add.tileSprite(-48, -22, 1031, 580, "bg1");
		gameBg.scaleX = 1.1;
		gameBg.scaleY = 1.1;
		gameBg.setOrigin(0, 0);

		// bg2
		const bg2 = this.add.tileSprite(-215, 47, 1500, 580, "bg2");
		bg2.setOrigin(0, 0);

		// bg3
		const bg3 = this.add.tileSprite(-215, 57, 1500, 580, "bg3");
		bg3.setOrigin(0, 0);

		// bg4
		const bg4 = this.add.tileSprite(-223, 108, 1500, 580, "bg4");
		bg4.setOrigin(0, 0);


		const mapBtn = new MapBtn(this, 44, 46);
		this.add.existing(mapBtn);

		// vinete
		const vinete = this.add.image(516, 270, "Vinete");
		vinete.blendMode = Phaser.BlendModes.MULTIPLY;


		// Chest
		const chest = new Chest(this, 135, 164);
		this.add.existing(chest);

		// Door
		const door = new Door(this, 938, 177);
		this.add.existing(door);

		// Player
		const player = new SpinePlayer(this, this.spine, 133, 149);
		this.add.existing(player);



		// fxON
		const fxON = new FxButton(this, 987, 46);
		this.add.existing(fxON);

		// musicON
		const musicON = new MusicBtn(this, 1179, 46);
		this.add.existing(musicON);

		// carboardEffect
		const carboardEffect = this.add.image(0, 0, "CarboardEffect");
		carboardEffect.blendMode = Phaser.BlendModes.MULTIPLY;
		carboardEffect.setOrigin(0, 0);
		carboardEffect.visible = false;

		// curtain1
		const curtain1 = this.add.image(515, -218, "Curtain1");

		// curtain2
		const curtain2 = this.add.image(515, 743, "Curtain2");

		const homePlayer = new HomePlayer(this, 44, 543);
		this.add.existing(homePlayer);
		this.homePlayer = homePlayer;
		this.homePlayer.depth = 20;	

		this.gameBg = gameBg;
		this.bg2 = bg2;
		this.bg3 = bg3;
		this.bg4 = bg4;
		this.vinete = vinete;
		this.chest = chest;
		this.door = door;
		this.player = player;
		this.fxON = fxON;
		this.musicON = musicON;
		this.carboardEffect = carboardEffect;
		this.curtain1 = curtain1;
		this.curtain2 = curtain2;

		this.events.emit("scene-awake");


			this.curtainOpen = this.sound.add("CurtainOpen");
			(this as any).addFx(this.curtainOpen);

	}

	public plataformas!: Phaser.Physics.Arcade.StaticGroup;
	public starsGroup!: Phaser.Physics.Arcade.Group;

	public music?: Phaser.Sound.BaseSound;
	public fxList: Phaser.Sound.BaseSound[] = [];
	public UseInternetMusic: boolean = true;
	private curtainOpen?: Phaser.Sound.BaseSound;
	// Write your code here

	create() {


		this.plataformas = this.physics.add.staticGroup();

		// Grupo de enemigos
		this.enemiesGroup = this.physics.add.group();
		this.physics.add.collider(this.enemiesGroup, this.plataformas);

		this.BaseCreate();
		this.editorCreate();
		this.resolveDepths();
		this.startingPositions();
		this.initMapOverlay();
  this.physics.world.gravity.y = 100; // gravedad global Arcade
  // Inicializa el flag global para detectar el primer cambio
    const reg = this.game.registry;
    reg.set('HasNewTrack', false);



		this.loadPlayerPrefs();
		this.curtain1.y = 144;
		this.curtain2.y = 434;
		this.vinete.visible = true;
		this.carboardEffect.visible = true;
		this.starsGroup = this.physics.add.group();


		this.input.once('pointerdown', () => {
			if (
				!this.sys.game.device.os.desktop &&
				!this.scale.isFullscreen &&
				this.scale.fullscreen.available
			) {
				this.scale.startFullscreen();
			}

		});

		// --- FADE IN DESDE NEGRO ---
		/* const fadeRect = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
			.setOrigin(0, 0)
			.setDepth(1000)
			.setAlpha(1);

        this.tweens.add({
            targets: fadeRect,
            alpha: 0,
            duration: 700,
            ease: 'Quad.Out',
            onComplete: () => {
                fadeRect.destroy();
                this.openCurtains();
            }
        });
*/





  this.openCurtains();

		// Partículas de lluvia
		//this.startRain();
		// Al dormir o apagar esta escena, parar su audio propio
		this.events.on(Phaser.Scenes.Events.SLEEP, () => {
			try { this.music?.stop(); } catch {}
			this.fxList.forEach(s => { try { s.stop(); } catch {} });
		});
		this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
			try { this.music?.stop(); } catch {}
			this.fxList.forEach(s => { try { s.stop(); } catch {} });
		});
	}

	// Lanza la escena Map (si no está activa) y coloca su viewport fuera de pantalla
	private initMapOverlay() {
		const key = 'Map';
		const w = this.scale.width;
		const h = this.scale.height;
		const ensure = () => {
			let mapScene: Phaser.Scene | undefined;
			try { mapScene = this.scene.get(key) as Phaser.Scene; } catch {}
			if (!mapScene) return;
			// Comienza oculta (arriba)
			mapScene.cameras.main.setViewport(0, -h, w, h);
			mapScene.input.enabled = false;
			this.scene.bringToTop(this.scene.key); // mantener este nivel arriba por defecto

		};
		if (!this.scene.isActive(key) && !this.scene.isSleeping(key) && !this.scene.isPaused(key)) {
			this.scene.launch(key);
			// configurar después de que arranque
			this.time.delayedCall(0, ensure);
		} else {
			ensure();
		}
	}

	// Muestra el mapa deslizándolo dentro (desde arriba o abajo)
	public showMapOverlay(fromTop: boolean = true) {
        this._mapFromTop = fromTop;
        const mapScene = this.scene.get('Map') as Phaser.Scene;
        const w = this.scale.width;
        const h = this.scale.height;
        const startY = fromTop ? -h : h;

        // preparar viewport del mapa y traerlo al frente
        mapScene.cameras.main.setViewport(0, startY, w, h);
        this.scene.bringToTop('Map');
        mapScene.input.enabled = true;

        // guardar la escena activa para que Map la reactive
        try { this.registry.set('LastActiveSceneKey', this.scene.key); } catch {}

        // animar usando el tween manager de Map (así podemos pausar esta escena)
        const base = this;
        mapScene.tweens.add({
            targets: mapScene.cameras.main as any,
            props: { y: 0 },
            duration: 400,
            ease: 'Cubic.Out',
            onComplete: () => { base._mapVisible = true; }
        });

        // deshabilitar input y pausar esta escena (update/physics/timers)
        this.input.enabled = false;
        try { this.physics.world.pause(); } catch {}
        this.scene.pause(this.scene.key);
	}

	// Oculta el mapa deslizándolo fuera de pantalla
	public hideMapOverlay(toTop: boolean = this._mapFromTop) {
		const mapScene = this.scene.get('Map') as Phaser.Scene;
		const h = this.scale.height;
		const endY = toTop ? -h : h;
		this.tweens.add({
			targets: mapScene.cameras.main as any,
			props: { y: endY },
			duration: 350,
			ease: 'Cubic.In',
			onComplete: () => {
				mapScene.input.enabled = false;
				this.scene.bringToTop(this.scene.key);
				this.input.enabled = true;
				this._mapVisible = false;
			}
		});
	}

	public toggleMapOverlay() {
		this.showMapOverlay(this._mapFromTop);
	}


public addCollidingEnemy(go: Phaser.GameObjects.GameObject) {
    // Asegura que el grupo exista
    if (!this.enemiesGroup) {
        this.enemiesGroup = this.physics.add.group();
        // Si aún no hay collider global, puedes asegurarlo aquí (opcional)
        if (this.plataformas) this.physics.add.collider(this.enemiesGroup, this.plataformas);
    }

    // Asegura cuerpo de física para el enemigo
    if (!(go as any).body) {
        this.physics.add.existing(go);
    }

    // Evita duplicados en el grupo
    const group = this.enemiesGroup as Phaser.Physics.Arcade.Group;
    if (!group.getChildren().includes(go)) {
        group.add(go);
        // Evento opcional para que otras partes reaccionen a nuevos enemigos
        this.events.emit('colliding-enemy-added', go);
    }
}

public removeCollidingEnemy(go: Phaser.GameObjects.GameObject) {
    // Quitar del grupo de enemigos (sin destruir ni sacar de la escena)
    if (this.enemiesGroup) {
        const group = this.enemiesGroup as Phaser.Physics.Arcade.Group;
        if (group.getChildren().includes(go)) {
            group.remove(go, false, false);
            this.events.emit('colliding-enemy-removed', go);
        }
    }
    // Compatibilidad con la lista vieja
    const i = this.collidingEnemies.indexOf(go);
    if (i !== -1) this.collidingEnemies.splice(i, 1);
}

public clearCollidingEnemies() {
    // Vaciar el grupo de enemigos (sin destruir ni sacar de la escena)
    if (this.enemiesGroup) {
        const group = this.enemiesGroup as Phaser.Physics.Arcade.Group;
        group.clear(false, false);
    }
    // Compatibilidad con la lista vieja
    this.collidingEnemies.length = 0;
}


	startRain() {
		const rainParticles = this.add.particles(0, 0, 'BubbleParticle', {
			x: { min: 0, max: this.scale.width },
			y: 0,
			lifespan: 1200,
			speedY: { min: 400, max: 600 },
			scale: { start: 0.15, end: 0.05 },
			alpha: { start: 0.7, end: 0 },
			quantity: 2,
			frequency: 30,
			blendMode: 'ADD'
		});
			rainParticles.setDepth(999)
	}

	resolveDepths() {

		this.curtain1.setDepth(1000);
		this.curtain2.setDepth(1000);
		this.player.setDepth(10);
	}

	startingPositions() {
		const chestOrigin = (this as any).chestOrigin;
		const doorOrigin = (this as any).doorOrigin;
		try {

			if (chestOrigin && this.chest) {
				// usar setPosition si está disponible
				(this.chest as any).setPosition?.(chestOrigin.x, chestOrigin.y);
				// fallback directo
				(this.chest as any).x = chestOrigin.x;
				(this.chest as any).y = chestOrigin.y;
				(this.player as any).x = chestOrigin.x;
				(this.player as any).y = chestOrigin.y;
				(this.player as any).SetOriginalPosition?.(chestOrigin.x, chestOrigin.y);
				// destruir el objeto origin para que no quede en la escena
				if (typeof chestOrigin.destroy === "function") chestOrigin.destroy();
				// eliminar la referencia opcionalmente
				try { delete (this as any).chestOrigin; } catch { }
			}
			if (doorOrigin && this.door) {
				// usar setPosition si está disponible
				(this.door as any).setPosition?.(doorOrigin.x, doorOrigin.y);
				// fallback directo
				(this.door as any).x = doorOrigin.x;
				(this.door as any).y = doorOrigin.y;
				// destruir el objeto origin para que no quede en la escena
				if (typeof doorOrigin.destroy === "function") doorOrigin.destroy();
				// eliminar la referencia opcionalmente
				try { delete (this as any).doorOrigin; } catch { }
			}
		} catch { }


	}


	addFx(fx: Phaser.Sound.BaseSound) {

			this.fxList.push(fx);
	}


	private loadPlayerPrefs() {
		try {
			const musicMutedRaw = localStorage.getItem("musicMuted");
			const fxMutedRaw = localStorage.getItem("fxMuted");
			const musicMuted = musicMutedRaw === "true";
			const fxMuted = fxMutedRaw === "true";
			console.log("Preferencias cargadas - Música muteada:", musicMuted, "Efectos de sonido muteados:", fxMuted);

			// Asegura que el SoundManager NO esté muteado globalmente (para que suenen los FX)
			this.sound.setMute(false);

			if (fxMuted) {
				this.fxON.setMuted(true);
				this.muteAllFx(true);
			}

			// No silencies el SoundManager aquí. Aplica el mute de música cuando se cree this.music (en openCurtains)
			// Guarda la preferencia si quieres consultarla luego
			this.registry.set("musicMuted", musicMuted);
		} catch {}
	}



	public muteAllFx(mute: boolean) {
		console.log("Muteando efectos de sonido:", mute);
		// Aplicar mute a todos los FX en la escena
		this.fxList.forEach(fx => (fx as any).setMute(mute));

		// Persistir preferencia (safe localStorage)
		try {
			localStorage.setItem("fxMuted", String(!!mute));
		} catch {
			console.warn("No se pudo guardar la preferencia de FX muteados");
			// Si localStorage no está disponible (p. ej. modo privado), ignorar
		}
	}


	openCurtains() {

	this.curtainOpen?.play();
	  if (!this.UseInternetMusic) {
        // Música local del pack
        this.music = this.sound.add("WholeMusic", { loop: true });
        this.music.play();
    } else {
        // Usando música por Internet (Map controla el <audio>), no reproducir música local
        // Opcional: asegura que cualquier música previa esté parada
        try { this.music?.stop(); } catch {}
        this.music = undefined;
    }

		this.tweens.add({
			targets: this.curtain1,
			y: -150,
			duration: 700,
			ease: 'Quad.Out'
		});
		this.tweens.add({
			targets: this.curtain2,
			y: 740,
			duration: 700,
			ease: 'Quad.Out'
		});

	}

	public closeCurtains() {
		this.tweens.add({
			targets: this.curtain1,
			y: 144,
			duration: 700,
			ease: 'Quad.Out'
		});
		this.tweens.add({
			targets: this.curtain2,
			y: 434,
			duration: 700,
			ease: 'Quad.Out'
		});

		// Fade out de la música
		if (this.music) {
			this.tweens.add({
				targets: this.music,
				volume: 0,
				duration: 1000,
				ease: 'Quad.Out',
				onComplete: () => {
					this.music?.stop();
				}
			});
		}

		this.time.delayedCall(1000, () => {

			this.gotoLevel();
		});
	}

	public gotoLevel(): void {
		const key = this.nextLevel || "Level1";
		// Extraer número final del nombre de la escena (Level1, Level2, etc.)
		const m = key.match(/(\d+)$/);
		const targetLevel = m ? Number(m[1]) : (key === "Level" ? 1 : 1);

		let prev = 1;
		try {
			const raw = localStorage.getItem("PlayerMaxLevel");
			prev = raw ? Math.max(1, Number(raw)) : 1;
		} catch {}

		const newMax = Math.max(prev, targetLevel);

		// Persistir y sincronizar
		try { localStorage.setItem("PlayerMaxLevel", String(newMax)); } catch {}
		try { this.registry.set("PlayerMaxLevel", newMax); } catch {}

		this.scene.start(key);
	}

	update() {
		if (!this.player) return;

		const playerX = this.player.x;
		const playerY = this.player.y;

		// Factores muy bajos para un parallax sutil

		this.bg2.x = -100 + (playerX - 299) * 0.05;
		this.bg2.y = 40 + (playerY - 322) * 0.05;

		this.bg3.x = -100 + (playerX - 299) * 0.08;
		this.bg3.y = 40 + (playerY - 322) * 0.08;

		this.bg4.x = -100 + (playerX - 299) * 0.12;
		this.bg4.y = 40 + (playerY - 322) * 0.12;
	}


	public collectStar() {
		console.log("Estrella recogida");
		// Aquí puedes agregar efectos de sonido o partículas si lo deseas
		// Por ejemplo: this.sound.play('star-collect-sound');

		// Verifica si quedan estrellas en la escena
		if (this.starsGroup.countActive(true) === 0) {
			// Todas las estrellas han sido recogidas
			console.log("Todas las estrellas recogidas, aparece la puerta");
			this.door.AppearDoor();
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
