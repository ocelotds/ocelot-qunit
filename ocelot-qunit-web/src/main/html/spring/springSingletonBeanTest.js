QUnit.module("springSingletonBean");
QUnit.test(".getCount()", function (assert) {
	var result = 0, nb = 10, num = 0, done = assert.async(), 
	timer = setTimeout(checkResult, 2000),
	expected = ((nb+1) * nb)/2,
	checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.ok(result > expected, "Spring singleton is bounded to application : result : "+result+" - expected : "+expected);
		done();
	},
	getCount = function() {
		springSingletonBean.getCount().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			result += evt.response;
			if(num<nb) {
				num++;
				getCount();
			} else checkResult();
		});
	};
	springSingletonBean.getCount().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		getCount();
	});
});

