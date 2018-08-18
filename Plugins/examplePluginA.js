return new class { // You can do this however you like, just make sure it always returns itself.

	// No plugin events or variables are required, including the following. If these are not present, there are built-in fallbacks.
	get name() { return "Example Plugin A" } // The display name of the plugin. This will not be used to access the plugin.
	get description() { return "The first example plugin." } // The description of the plugin, to describe its features and any other information you wish to include.
	get creator() { return "Metalloriff" } // The plugin creator's name, GitHub username, nickname, etc.
	get version() { return "0.0.1" } // The plugin version. This is required if you wish for the plugin to auto-update. Keep the format of MAJOR.MINOR.PATCH to avoid issues.
	get url() { return "https:// raw.githubusercontent.com/Metalloriff/MotifyMod/master/Plugins/examplePluginA.js" } // A direct link, raw link to the plugin. This is also required if you wish for the plugin to auto-update.

	get settingFields() { // This is used to specify all settings that will be visible in the plugin's settings menu, and how they will be interpreted. The key name of each field must be the same as its target setting.
		return {
			boolean: { label: "A boolean setting", description: "Every field type can have a description.", type: "bool" },
			string: { label: "A string setting", type: "string" },
			integer: { label: "An integer setting", type: "int" },
			float: { label: "A floating point setting", type: "float" },
			custom: {
				type: "custom",
				element: function (plugin, set) {
					const element = document.createElement("div");
					element.textContent = plugin.settings.custom;
					element.onclick = () => set("The 'custom' setting will now be set to this string when you refresh the settings.");
					return element; // The element must be returned.
				}
			},
			customHTML: {
				type: "custom",
				html: `<div style="color:red">I cannot have a callback by default.</div>`
			}, // Hint: you can also use both element and html in the same custom field.
			stringArray: { label: "An array of strings", description: "Every field type can be an array if the 'array' value is true.", type: "string", array: true },
			list: { label: "Boolean list", description: "The length of lists cannot be changed by the user. Every field type can be a list if the 'list' value is true.", type: "bool", list: true },
			radio: { label: "Radio button group", type: "radio", choices: {
				x: { label: "Choice #1", description: "You can make all these whatever, just make sure the value name is correct" },
				y: { label: "Choice #2" },
				z: { label: "Choice #3" }
			}}
		};
	}

	get defaultSettings() { // This is required if you wish to allow the user to change settings in the plugin.
		return {
			boolean: false,
			string: "Hello world",
			integer: 69,
			float: 4.20,
			custom: "I'm not set yet. Click to set me, then refresh the settings.",
			customHTML: "I'm mostly for displaying non-interactive things.",
			stringArray: [],
			list: {
				isArray: false,
				isList: true,
				canUserChangeLength: false
			},
			radio: "y"
		};
	}

	onSettingChanged(keyName, oldValue, newValue) { // This will be called every time you change a setting for this plugin.
		console.log(keyName, oldValue, newValue);
	}

	onSettingsMenu(menuNode) { // This will be called when opening the Spotify settings menu.

	}

	onNodeAdded(addedNode) { // Called every time a node is added to Spotify, from the main mutation observer.

	}

	onNodeRemoved(removedNode) { // Called every time a node is removed from Spotify, from the main mutation observer.

	}

	onAppLoaded(loadedWindow, loadedDocument) { // Called every time a Spotify app is loaded for the first time.

	}

	init() {
		addGlobalEventListener("click", this.clickEvent = e => this.onClick(e)); // Spotify is split up into separate "Apps", so I have created a few functions to avoid having to iterate through every app manually.

		console.log("Spotify Internals", SpotifyInternals); // Motify includes many useful methods and classes, one of which is "SpotifyInternals", which gives you access to some basic internal JS modules.

		// This would restart your current song, for a simple example.
		/* const EVENT = SpotifyInternals.getModuleById(10); 
		console.log("Spotify Event Types", EVENT.TYPES);
		SpotifyInternals.getModuleById(9).dispatchEvent(new EVENT(EVENT.TYPES.PLAYER_SEEK, 0)); */

		console.log("Motify API", MotifyAPI); // Motify comes with an API class that contains some basic but useful functions.

		// Don't run this. Seriously.
		/* MotifyAPI.injectCSS("someID", `*{filter:saturate(5000%)}`); */

		console.log("React Data", ReactData); // ReactData allows you to access properties and events from some elements. Spotify does not seem to use this in many places, but in some.MotifyAPI

		// Log the properties of the selected element.
		/* console.log(ReactData.getProps($0)); */

		// There is much more that Motify implements, but this is only a basic overview.
	}

	onClick(e) {
		console.log({ "Clicked": e });
	}

	end() {
		removeGlobalEventListener("click", this.clickEvent); // Always ensure that your plugin unloads properly. If it does not, it may require restarting the client any time it's disabled, or other misbehaviours.
	}

};
