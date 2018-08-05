return new class {

	get name() { return "Album Accent Color As Primary Theme Color" }
	get description() { return "Sets the '--primary-color' theme setting to the most vibrant color of the current album cover. Requires any theme with a primary color." }
	get creator() { return "Metalloriff" }
	get version() { return "0.0.1" }
	get url() { return "https://raw.githubusercontent.com/Metalloriff/EnhancedSpotify/master/Plugins/albumAccentAsPrimaryColor.js" }

	init() {
		EnhancedSpotifyAPI.readFile("https://raw.githubusercontent.com/jariz/vibrant.js/master/dist/Vibrant.min.js", data => {
			eval(data);
			this.ready();
		});
	}

	ready() {
		const albumCover = document.getElementsByClassNameGlobal("cover-image")[0];

		let lastURL = "";

		this.updateLoop = setInterval(() => {
			let coverURL = albumCover.style.backgroundImage.match(/url\((.*)\)/)[1].split('"').join("");
			coverURL = "https://i.scdn.co/image/" + coverURL.split(":")[coverURL.split(":").length - 1];
			if(lastURL != coverURL) {
				const img = document.createElement("img");
				img.onload = () => this.updateAccent(img);
				img.src = coverURL + "?" + new Date().getTime();
				img.crossOrigin = "";
				lastURL = coverURL;
			}
		}, 1000);
	}

	updateAccent(img) {
		try{
			const vibrant = new Vibrant(img, 5, 5), accent = (vibrant.VibrantSwatch || vibrant.LightVibrantSwatch || vibrant.DarkVibrantSwatch || vibrant.MutedSwatch || vibrant._swatches[0]).getHex();
			esThemeSettings["--primary-color"] = accent;
			addonLoader.updateThemeSettings();
		} catch(err) {
			console.error({ "albumAccentAsPrimaryColor.updateAccent(img)" : err });
		}
	}

	end() {
		delete window.Vibrant;
		document.getElementsByClassNameGlobal("cover-image")[0].removeEventListener("load", this.onCoverLoaded);
		clearInterval(this.updateLoop);
	}

};
