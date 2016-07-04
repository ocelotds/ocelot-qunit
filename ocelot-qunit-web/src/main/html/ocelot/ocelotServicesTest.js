QUnit.module("ocelotServices");
QUnit.test(".setLocale()", function (assert) {
	var done = assert.async(), func;
	func = function (evt) {
		ocelotController.cacheManager.removeEventListener("remove", func);
		ocelotServices.getLocale().event(function (evt) {
			assert.equal(evt.type, "RESULT", "Locale from server "+evt.response);
			ocelotServices.setLocale({"language": "fr", "country": "FR"}).event(function (evt) {
				assert.equal(evt.type, "RESULT");
				if(evt.type === "RESULT") {
					ocelotServices.getLocale().event(function (evt) {
						assert.equal(evt.type, "RESULT");
						if(evt.type === "RESULT") {
							assert.equal(evt.response.language, "fr", "Language was "+evt.response.language);
							assert.equal(evt.response.country, "FR", "Country was "+evt.response.country);
						}
						done();
					});
				} else done();
			});
		});
	};
	ocelotController.cacheManager.addEventListener("remove", func);
	ocelotServices.setLocale({"language": "en", "country": "US"}).event(function (evt) {
		assert.equal(evt.type, "RESULT");
	});
});

