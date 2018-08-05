return new class {

	get name() { return "Ad Block" }
	get description() { return "Blocks all visual and audio ads." }
	get creator() { return "Metalloriff" }
	get version() { return "0.0.1" }
	get url() { return "https://raw.githubusercontent.com/Metalloriff/EnhancedSpotify/master/Plugins/adBlock.js" }

	init() {
		for(let w of windows) this.patch(w);
		this.styles = EnhancedSpotifyAPI.injectCSS("adBlock", ".ad-container{display:none}");
	}

	onAppLoaded(w) {
		this.patch(w);
	}

	patch(w) {
		const unpatchedBrigdeReq = w.unpatchedBridgeRequest = w._getSpotifyModule("bridge").executeRequest;
		w._getSpotifyModule("bridge").executeRequest = function(r, e) {

			try{
				const data = JSON.parse(r), uri = data.args && data.args[1] ? data.args[1].uri : null;

				/*const unpatchedSuccess = e.onSuccess;
				e.onSuccess = e => {
					try {
						const parsed = JSON.parse(e), output = {};
						if(parsed.body && parsed.body.includes('"provider":"ad"')) {
							output["[adBlock.js] Audio Ad Prevented (" + uri + ")"] = parsed;
							return console.warn(output);
						}
					} catch(err) {
						console.error({ "adBlock.js executeRequest.onSuccess error" : err });
					}
					unpatchedSuccess(e);
				};*/

				const output = {};
				if(uri && uri.includes("/ads/")) {
					output["[adBlock.js] Banner/Popup Ad Blocked"] = { data : data, events : e };
					return console.warn(output);
				}
			} catch(err) {
				console.error({ "adBlock.js executeRequest error" : err });
			}

			unpatchedBrigdeReq.apply(w, arguments);
		};
	}

	end() {
		for(let w of windows) {
			w._getSpotifyModule("bridge").executeRequest = w.unpatchedBridgeRequest;
			delete w.unpatchedBridgeRequest;
		}
		this.styles.destroy();
	}

};
