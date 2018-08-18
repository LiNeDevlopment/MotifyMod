return new class {

	get name() { return "Experiments Button" }
	get description() { return "Adds an 'Experiments' button to the user profile dropdown menu." }
	get creator() { return "Metalloriff" }
	get version() { return "0.0.1" }
	get url() { return "https://raw.githubusercontent.com/Metalloriff/MotifyMod/master/Plugins/experimentsButton.js" }

	init() {
		document.addEventListener("click", this.clickEvent = e => {
			if(e.target.id == "profile-menu-toggle" && document.getElementsByClassName("GlueMenu__root-items").length) {
				const logoutButton = document.getElementsByClassName("GlueMenu__root-items")[0].lastChild;

				logoutButton.outerHTML = `<button id="es-experiments-button" class="GlueMenuItem" role="menuitem" data-submenu="false" tabindex="-1">Experiments</button>${logoutButton.outerHTML}`;
				const experimentsButton = document.getElementById("es-experiments-button");

				experimentsButton.addEventListener("click", () => {
					const event = SpotifyInternals.getModuleById(10);
					SpotifyInternals.getModuleById(9).dispatchEvent(new event(event.TYPES.NAVIGATION_OPEN_URI, "spotify:app:experiments"));
					document.getElementById("profile-menu-toggle").click();
				});
			}
		});
	}

	end() {
		document.removeEventListener("click", this.clickEvent);
	}

};
