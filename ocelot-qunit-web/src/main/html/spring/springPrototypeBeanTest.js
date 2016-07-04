QUnit.module("springPrototypeBean");
QUnit.test(".getCount()", function (assert) {
	var result = 0, nb = 10, num = 0, done = assert.async(), 
	timer = setTimeout(checkResult, 2000),
	notExpected = ((nb+1) * nb)/2,
	checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.notEqual(result, notExpected, "Spring prototype, don't store result getCount : "+result +" != "+notExpected);
		done();
	},
	getCount = function() {
		springPrototypeBean.getCount().event(function (evt) {
			result += evt.response;
			if(num<nb) {
				num++;
				getCount();
			} else checkResult();
		});
	};
	springPrototypeBean.init().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		result = 0;
		getCount();
	});
});
QUnit.test(".getCountFromSingletonAutoWired()", function (assert) {
	var result = 0, nb = 10, num = 0, done = assert.async(), 
	timer = setTimeout(checkResult, 2000),
	expected = ((nb+1) * nb)/2,
	checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.ok(result === expected, "Result singleton is never reset "+result+" == "+expected);
		done();
	},
	getCount = function() {
		springPrototypeBean.getCountFromSingleton().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			result += evt.response;
			if(num<nb) {
				num++;
				getCount();
			} else checkResult();
		});
	};
	springPrototypeBean.initSingleton().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		getCount();
	});
});

