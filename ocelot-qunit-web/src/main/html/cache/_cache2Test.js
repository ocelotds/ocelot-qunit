/**
 * CacheServices2
 */
QUnit.module("cacheServices2");
QUnit.test(".methodCached()", function (assert) {
	var expected, done = assert.async();
	cacheServices2.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices2.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			done();
		});
	});
});
QUnit.test(".methodRemoveCache()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices2.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices2.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices2.methodRemoveCache().event(function (evt) {
				assert.equal(evt.type, "RESULT", "Cache removed.");
				cacheServices2.methodCached().event(function (evt) {
					assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
					done();
				});
			});
		});
	});
});
QUnit.test(".methodRemoveCache()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices2.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices2.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices2.removeCacheFromBusiness().event(function (evt) {
				assert.equal(evt.type, "RESULT", "Cache removed.");
				cacheServices2.methodCached().event(function (evt) {
					assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
					done();
				});
			});
		});
	});
});
QUnit.test(".methodRemovesCache()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices2.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices2.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices2.methodRemovesCache({"integer":4}).event(function (evt) { // arg not considerate for this method
				assert.equal(evt.type, "RESULT", "Cache removed.");
				cacheServices2.methodCached().event(function (evt) {
					assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
					done();
				});
			});
		});
	});
});
QUnit.test(".methodCachedWithArg()", function (assert) {
	var expected, done = assert.async();
	cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices2.methodCachedWithArg({"integer":4}).event(function (evt) { // other key
				assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
				done();
			});
		});
	});
});
QUnit.test(".methodRemoveCacheWithArg()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices2.methodRemoveCacheWithArg(4, 1).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Another Cache removed.");
			cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
				assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
				cacheServices2.methodRemoveCacheWithArg(5, 1).event(function (evt) {
					assert.equal(evt.type, "RESULT", "Cache removed.");
					cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
						assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
						done();
					});
				});
			});
		});
	});
});
QUnit.test(".methodRemoveAllCacheResultOfMethod()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected1, expected2, done = assert.async();
	cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
		expected1 = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected1) + " from server and put in cache.");
		cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
			assert.deepEqual(evt.response, expected1, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected1));
			cacheServices2.methodCachedWithArg({"integer":4}).event(function (evt) {
				expected2 = evt.response;
				assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected2) + " from server and put in cache.");
				cacheServices2.methodCachedWithArg({"integer":4}).event(function (evt) {
					assert.deepEqual(evt.response, expected2, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected2));
					cacheServices2.methodRemoveAllCacheResultOfMethod().event(function (evt) {
						assert.equal(evt.type, "RESULT", "Cache removed.");
						cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
							assert.notDeepEqual(evt.response, expected1, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected1)+" must be different");
							cacheServices2.methodCachedWithArg({"integer":4}).event(function (evt) {
								assert.notDeepEqual(evt.response, expected2, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected2)+" must be different");
								done();
							});
						});
					});
				});
			});
		});
	});
});
QUnit.test(".methodRemovesCacheWithArgs()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices2.methodRemovesCache({"integer":4}).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Another Cache removed.");
			cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
				assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
				cacheServices2.methodRemovesCache({"integer":5}).event(function (evt) {
					assert.equal(evt.type, "RESULT", "Cache removed.");
					cacheServices2.methodCachedWithArg({"integer":5}).event(function (evt) {
						assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
						done();
					});
				});
			});
		});
	});
});
QUnit.test(".methodRemoveAllCache()", function (assert) {
	ocelotController.cacheManager.clearCache();
	var expected, done = assert.async();
	cacheServices2.methodCached().event(function (evt) {
		expected = evt.response;
		assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
		cacheServices2.methodCached().event(function (evt) {
			assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response)+" expected : "+JSON.stringify(expected));
			cacheServices2.methodRemoveAllCache().event(function (evt) {
				assert.equal(evt.type, "RESULT", "All Cache removed.");
				cacheServices2.methodCached().event(function (evt) {
					assert.notDeepEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected)+" must be different");
					done();
				});
			});
		});
	});
});

