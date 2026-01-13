// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import GlowAnimation from "./GlowAnimation";
/* END-USER-IMPORTS */

export default class CatTrackSlot extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "CatTrackCover", frame);

		// awake handler
		this.scene.events.once("scene-awake", () => this.awake());

		/* START-USER-CTR-CODE */
		// Write your code here.
		// Listener para HasNewTrack/UnlockedTracks y mostrar Glow si este slot fue desbloqueado



		/* END-USER-CTR-CODE */
	}

	public TrackToUnlock: string = "Unlock1";
	public radioPreset: string = "Retrowave";
	public CatToUnlock: string = "BigCat1";

	/* START-USER-CODE */
	private _onRegChange?: (parent: any, key: string, value: any) => void;
    private pulseTween?: Phaser.Tweens.Tween;
	private isFlipping: boolean = false;
	private hasFlipped: boolean = false; // Solo puede “revelarse” una vez

    awake(): void {
      const reg = this.scene.game.registry;

      // Primear registry con valores persistidos
      if (reg.get('UnlockedTracks') == null) {
        try { reg.set('UnlockedTracks', JSON.parse(localStorage.getItem('UnlockedTracks') || '[]') || []); }
        catch { reg.set('UnlockedTracks', []); }
      }
      if (reg.get('UnlockedAndFliped') == null) {
        try { reg.set('UnlockedAndFliped', JSON.parse(localStorage.getItem('UnlockedAndFliped') || '[]') || []); }
        catch { reg.set('UnlockedAndFliped', []); }
      }
      if (reg.get('HasNewTrack') == null) reg.set('HasNewTrack', false);

      this._onRegChange = (_p: any, key: string) => {
        if (key === 'HasNewTrack' || key === 'UnlockedTracks' || key === 'UnlockedAndFliped') {
          this.applyUnlockFX();
          this.applyInteractivityByUnlock();
        }
      };
      reg.events.on('changedata', this._onRegChange, this);

      // Estado inicial
      this.loadFlippedState();
      this.applyUnlockFX();
      this.applyInteractivityByUnlock();

      // Si este slot corresponde a LoFi, auto-revelarlo y dejarlo desbloqueado
      if (this.radioPreset && this.radioPreset.toLowerCase() === 'lofi' && !this.hasFlipped) {
        this.revealPresetImmediately();
      }

      // Listo para clicks (flip o seleccionar preset)
      this.setInteractive({ useHandCursor: true });
      this.on('pointerdown', () => this.onClickFlip());

      this.once(Phaser.GameObjects.Events.DESTROY, () => {
        reg.events.off('changedata', this._onRegChange!, this);
        this._onRegChange = undefined;
        this.stopPulseFX();
      });
    }

    private applyUnlockFX() {
		// Si ya fue revelado, no mostrar FX
		if (this.hasFlipped) {
			this.stopPulseFX(true);
			return;
		}

        // Leer lista de desbloqueos del registry o localStorage
        const reg = this.scene.game.registry;
        let unlocked = reg.get('UnlockedTracks') as string[] | undefined;
        if (!Array.isArray(unlocked)) {
            try {
                unlocked = JSON.parse(localStorage.getItem('UnlockedTracks') || '[]');
            } catch { unlocked = []; }
        }

        const isUnlocked = Array.isArray(unlocked) && unlocked.includes(this.TrackToUnlock);
        if (isUnlocked) {
            // Activar “pulse” de escala y leve glow sin prefab
            this.startPulseFX();
        } else {
            // Quitar FX si no está desbloqueado
            this.stopPulseFX(true);
        }
    }

	private isUnlocked(): boolean {
		const reg = this.scene.game.registry;
		let unlocked = reg.get('UnlockedTracks') as string[] | undefined;
		if (!Array.isArray(unlocked)) {
			try { unlocked = JSON.parse(localStorage.getItem('UnlockedTracks') || '[]'); }
			catch { unlocked = []; }
		}
		return Array.isArray(unlocked) && unlocked.includes(this.TrackToUnlock);
	}

    // Habilita/deshabilita interacción y apariencia según desbloqueo
    private applyInteractivityByUnlock() {
        const unlocked = this.isUnlocked();

        if (this.hasFlipped) {
            // Ya revelado: debe seguir siendo clickable para cambiar la estación
            this.setInteractive({ useHandCursor: true });
            this.clearTint();
            this.setBlendMode(Phaser.BlendModes.NORMAL);
            this.setAlpha(1);
            return;
        }

        if (unlocked) {
            // Interactivo y apariencia normal (aún no revelado)
            this.setInteractive({ useHandCursor: true });
            this.clearTint();
            this.setBlendMode(Phaser.BlendModes.NORMAL);
            this.setAlpha(1);
        } else {
            // No interactivo y más oscuro
            this.disableInteractive();
            this.setTint(0x7A7A7A);
            this.setAlpha(0.6);
            this.setBlendMode(Phaser.BlendModes.NORMAL);
            this.stopPulseFX(true);
        }
    }

	private loadFlippedState() {
		try {
			const raw = localStorage.getItem('UnlockedAndFliped');
			const list: string[] = raw ? JSON.parse(raw) : [];
			this.hasFlipped = Array.isArray(list) && list.includes(this.TrackToUnlock);

		} catch { this.hasFlipped = false; }

		if (this.hasFlipped) {
			// Ya revelado previamente: fijar textura y mantener interactivo para cambiar estación
			if (this.TrackToUnlock) this.setTexture(this.TrackToUnlock);
			this.stopPulseFX(true);
			this.setInteractive({ useHandCursor: true });
			this.setScale(1);
			this.clearTint();
			this.setBlendMode(Phaser.BlendModes.NORMAL);
			this.setAlpha(1);
		}
	}

		private persistFlippedState() {
		try {
			const key = 'UnlockedAndFliped';
			const raw = localStorage.getItem(key);
			const list: string[] = raw ? JSON.parse(raw) : [];
			if (!list.includes(this.TrackToUnlock)) {
				list.push(this.TrackToUnlock);
				localStorage.setItem(key, JSON.stringify(list));
				// Refleja en registry para quien escuche
				this.scene.game.registry.set(key, list);
			}
		} catch {
			// Fallback: emite en registry aunque falle el storage
			const reg = this.scene.game.registry;
			const listReg = (reg.get('UnlockedAndFliped') as string[]) || [];
			if (!listReg.includes(this.TrackToUnlock)) {
				listReg.push(this.TrackToUnlock);
				reg.set('UnlockedAndFliped', listReg);
			}
		}
	}

	   // Dejar el slot revelado sin animación (no desactivar interactividad)
    public revealPresetImmediately() {
        this.hasFlipped = true;
        if (this.TrackToUnlock) this.setTexture(this.TrackToUnlock);
        this.stopPulseFX(true);
        this.setInteractive({ useHandCursor: true });
        this.setScale(1);
        this.clearTint();
        this.setBlendMode(Phaser.BlendModes.NORMAL);
        this.setAlpha(1);
        this.persistFlippedState();

        // Asegurar preset de radio desbloqueado (si aplica)
        if (this.radioPreset) {
            const key = 'UnlockedRadioPresets';
            let list: string[] = [];
            try {
                list = JSON.parse(localStorage.getItem(key) || '[]');
                if (!Array.isArray(list)) list = [];
            } catch { list = []; }
            if (!list.includes(this.radioPreset)) {
                list.push(this.radioPreset);
                try { localStorage.setItem(key, JSON.stringify(list)); } catch {}
            }
            this.scene.game.registry.set(key, list);
        }

        (this.scene as any).newUnlockText?.setVisible(false);
    }


    private startPulseFX() {
        // Evitar duplicar
        if (this.pulseTween && this.pulseTween.isPlaying()) return;

        // Leve “glow” usando blend ADD y tint claro (sin prefab)
        this.setBlendMode(Phaser.BlendModes.ADD);
        this.setTint(0xFFFFCC);

        // Reset de escala base
        this.setScale(1);

        // Tween de pulso
        this.pulseTween = this.scene.tweens.add({
            targets: this,
            scale: 1.1,
            duration: 420,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.InOut'
        });
    }

    private stopPulseFX(resetAppearance: boolean = false) {
        this.pulseTween?.stop();
        this.pulseTween = undefined;
        if (resetAppearance) {
            this.setScale(1);
            this.clearTint();
            this.setBlendMode(Phaser.BlendModes.NORMAL);
        }
    }

	// Al hacer click: si ya está revelado, seleccionar preset; si no, hacer flip
    private onClickFlip() {
        // Si ya fue revelado y tiene preset, seleccionar la radio directamente
        if (this.hasFlipped && this.radioPreset) {
            // Persistir selección
            try { localStorage.setItem("RadioStylePreset", this.radioPreset); } catch {}

            // Enviar señales a Map: cambiar preset y la portada (songAlbum)
            const reg = this.scene.game.registry;
            reg.set("RequestLoadRadio", this.radioPreset);
            if (this.TrackToUnlock) {
                reg.set("RequestAlbumTexture", this.CatToUnlock);
            }
            return;
        }

        // Si no está desbloqueado o ya está flippeando, no hacer nada
        if (this.isFlipping || this.hasFlipped || !this.isUnlocked()) return;
        this.isFlipping = true;

        this.stopPulseFX(true);

        this.setScale(1, 1);
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            duration: 180,
            ease: 'Cubic.In',
            onComplete: () => {
                if (this.TrackToUnlock) this.setTexture(this.TrackToUnlock);
                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1,
                    duration: 180,
                    ease: 'Cubic.Out',
                    onComplete: () => {
                        this.isFlipping = false;
                        this.hasFlipped = true;
                        this.persistFlippedState();

                        // Mantener interacción activa para clicks futuros (cambiar estación)
                        this.setInteractive({ useHandCursor: true });

                        // Ocultar hint global
                        const sceneAny = this.scene as any;
                        sceneAny.newUnlockText?.setVisible(false);

                        // Desbloquear preset de radio asociado
                        if (this.radioPreset) {
                            const key = 'UnlockedRadioPresets';
                            let list: string[] = [];
                            try {
                                list = JSON.parse(localStorage.getItem(key) || '[]');
                                if (!Array.isArray(list)) list = [];
                            } catch { list = []; }
                            if (!list.includes(this.radioPreset)) {
                                list.push(this.radioPreset);
                                try { localStorage.setItem(key, JSON.stringify(list)); } catch {}
                            }
                            this.scene.game.registry.set(key, list);
                            
                            // Cargar la radio automáticamente después del flip
                            try { localStorage.setItem("RadioStylePreset", this.radioPreset); } catch {}
                            const reg = this.scene.game.registry;
                            reg.set("RequestLoadRadio", this.radioPreset);
                            if (this.TrackToUnlock) {
                                reg.set("RequestAlbumTexture", this.CatToUnlock);
                            }
                        }

                        this.applyInteractivityByUnlock();
                    }
                });
            }
        });
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
