ocelotController.cacheManager.clearCache();
ocelotServices.getVersion().then(function(version) {
	document.title = "Qunit Ocelotds "+version;
})


