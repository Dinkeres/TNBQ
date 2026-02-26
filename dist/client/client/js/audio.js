import * as _ from "lodash";
import Area from "./area";
import Detect from "./detect";
var AudioManager = (function () {
    function AudioManager(game) {
        var self = this;
        this.isMusicEnabled = true;
        this.musicVolume = 0.7;
        this.isSoundEnabled = true;
        this.soundVolume = 0.7;
        this.extension = Detect.canPlayMP3() ? "mp3" : "ogg";
        this.sounds = {};
        this.game = game;
        this.currentMusic = null;
        this.areas = [];
        this.musicNames = [
            "village",
            "beach",
            "forest",
            "cave",
            "desert",
            "lavaland",
            "boss",
            "freezingland",
            "icewalk",
            "skeletoncommander",
            "necromancer",
            "cowlevel",
            "shaman",
            "butcher",
            "temple",
            "deathangel",
        ];
        this.soundNames = [
            "loot",
            "hit1",
            "hit2",
            "hurt",
            "heal",
            "chat",
            "revive",
            "death",
            "firefox",
            "achievement",
            "levelup",
            "kill1",
            "kill2",
            "noloot",
            "teleport",
            "chest",
            "npc",
            "npc-end",
            "raise",
            "deathangel-death",
            "deathangel-spell",
            "portal-open",
            "skill-heal",
            "skill-defense",
            "skill-resistances",
            "skill-magic",
            "skill-flame",
            "skill-lightning",
            "skill-cold",
            "skill-poison",
            "curse",
            "magicstone",
            "secret-found",
            "stone-break",
            "lever",
            "lever3",
            "fireball",
            "iceball",
            "trap",
            "powder",
            "fresh-meat",
            "magic-blast",
            "static",
        ];
        var loadSoundFiles = function () {
            console.info("Loading sound files...");
            _.each(self.soundNames, function (name) {
                self.loadSound(name, function () { });
            });
        };
        if (!(Detect.isSafari() && Detect.isWindows())) {
            loadSoundFiles();
        }
        else {
            this.isMusicEnabled = false;
            this.isSoundEnabled = false;
        }
    }
    AudioManager.prototype.updateMusicVolume = function (volume) {
        if (typeof volume !== "number" || volume > 1 || volume < 0) {
            volume = 0.7;
        }
        this.musicVolume = volume;
        var music = this.getSurroundingMusic(this.game.player);
        if (music === null || music === void 0 ? void 0 : music.sound) {
            music.sound.volume = this.musicVolume;
        }
    };
    AudioManager.prototype.updateSoundVolume = function (volume) {
        if (typeof volume !== "number" || volume > 1 || volume < 0) {
            volume = 0.7;
        }
        this.soundVolume = volume;
    };
    AudioManager.prototype.disableMusic = function () {
        this.isMusicEnabled = false;
        if (this.currentMusic) {
            this.resetMusic(this.currentMusic);
        }
    };
    AudioManager.prototype.enableMusic = function () {
        this.isMusicEnabled = true;
        if (this.currentMusic) {
            this.currentMusic = null;
        }
        this.updateMusic();
    };
    AudioManager.prototype.disableSound = function () {
        this.isSoundEnabled = false;
    };
    AudioManager.prototype.enableSound = function () {
        this.isSoundEnabled = true;
    };
    AudioManager.prototype.load = function (basePath, name, loaded_callback, channels) {
        var _this = this;
        var path = basePath + name + "." + this.extension;
        var sound = document.createElement("audio");
        loaded_callback === null || loaded_callback === void 0 ? void 0 : loaded_callback();
        sound.addEventListener("error", function () {
            console.error("Error: " + path + " could not be loaded.");
            _this.sounds[name] = null;
        }, false);
        sound.preload = "auto";
        sound.src = path;
        sound.load();
        this.sounds[name] = [sound];
        _.times(channels - 1, function () {
            _this.sounds[name].push(sound.cloneNode(true));
        });
    };
    AudioManager.prototype.loadSound = function (name, handleLoaded) {
        this.load("audio/sounds/", name, handleLoaded, 4);
    };
    AudioManager.prototype.loadMusic = function (name, handleLoaded) {
        this.load("audio/music/", name, handleLoaded, 1);
        var music = this.sounds[name][0];
        music.loop = true;
        music.addEventListener("ended", function () {
            music.play();
        }, false);
    };
    AudioManager.prototype.getSound = function (name) {
        if (!this.sounds[name]) {
            return null;
        }
        return this.sounds[name].find(function (sound) { return !sound.ended || !sound.paused; });
    };
    AudioManager.prototype.playSound = function (name, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.delay, delay = _c === void 0 ? 0 : _c, volume = _b.volume, _d = _b.force, force = _d === void 0 ? false : _d;
        var sound = (this.isSoundEnabled || force) && this.getSound(name);
        if (sound) {
            sound.volume = force ? 0.7 : this.soundVolume ? volume || this.soundVolume : 0;
            setTimeout(function () {
                sound.play();
            }, delay);
        }
    };
    AudioManager.prototype.addArea = function (x, y, width, height, musicName) {
        var area = new Area(x, y, width, height);
        area.musicName = musicName;
        this.areas.push(area);
    };
    AudioManager.prototype.getSurroundingMusic = function (entity) {
        var music = null;
        var area = _.find(this.areas, function (area) {
            return area.contains(entity);
        });
        if (area) {
            if (!this.sounds[area.musicName]) {
                this.loadMusic(area.musicName);
            }
            else {
                music = { sound: this.getSound(area.musicName), name: area.musicName };
            }
        }
        return music;
    };
    AudioManager.prototype.updateMusic = function () {
        if (this.isMusicEnabled) {
            var music = this.getSurroundingMusic(this.game.player);
            if (music) {
                if (!this.isCurrentMusic(music)) {
                    if (this.currentMusic) {
                        this.fadeOutCurrentMusic();
                    }
                    this.playMusic(music);
                }
            }
            else {
                this.fadeOutCurrentMusic();
            }
        }
    };
    AudioManager.prototype.isCurrentMusic = function (music) {
        return this.currentMusic && music.name === this.currentMusic.name;
    };
    AudioManager.prototype.playMusic = function (music) {
        if (this.isMusicEnabled && (music === null || music === void 0 ? void 0 : music.sound)) {
            if (music.sound.fadingOut) {
                this.fadeInMusic(music);
            }
            else {
                music.sound.volume = this.musicVolume;
                music.sound.play();
            }
            this.currentMusic = music;
        }
    };
    AudioManager.prototype.resetMusic = function (music) {
        if (music && music.sound && music.sound.readyState > 0) {
            music.sound.pause();
            music.sound.currentTime = 0;
        }
    };
    AudioManager.prototype.fadeOutMusic = function (music, ended_callback) {
        var self = this;
        if (music && !music.sound.fadingOut) {
            this.clearFadeIn(music);
            music.sound.fadingOut = setInterval(function () {
                var step = 0.02, volume = music.sound.volume - step;
                if (self.isMusicEnabled && volume >= step) {
                    music.sound.volume = volume;
                }
                else {
                    music.sound.volume = 0;
                    self.clearFadeOut(music);
                    ended_callback(music);
                }
            }, 50);
        }
    };
    AudioManager.prototype.fadeInMusic = function (music) {
        var self = this;
        if (music && !music.sound.fadingIn) {
            this.clearFadeOut(music);
            music.sound.fadingIn = setInterval(function () {
                var step = 0.01;
                var volume = music.sound.volume + step;
                if (self.isMusicEnabled && volume < this.musicVolume - step) {
                    music.sound.volume = volume;
                }
                else {
                    music.sound.volume = self.musicVolume;
                    self.clearFadeIn(music);
                }
            }, 30);
        }
    };
    AudioManager.prototype.clearFadeOut = function (music) {
        if (music.sound.fadingOut) {
            clearInterval(music.sound.fadingOut);
            music.sound.fadingOut = null;
        }
    };
    AudioManager.prototype.clearFadeIn = function (music) {
        if (music.sound.fadingIn) {
            clearInterval(music.sound.fadingIn);
            music.sound.fadingIn = null;
        }
    };
    AudioManager.prototype.fadeOutCurrentMusic = function () {
        var self = this;
        if (this.currentMusic) {
            this.fadeOutMusic(this.currentMusic, function (music) {
                self.resetMusic(music);
            });
            this.currentMusic = null;
        }
    };
    return AudioManager;
}());
export default AudioManager;
