QUnit.module("cdiRequestBean");
QUnit.test(".getCount()", function (assert) {
	var result = 0, nb = 10, num = 0, done = assert.async(), 
	timer = setTimeout(checkResult, 2000),
	notExpected = ((nb+1) * nb)/2,
	checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.notEqual(result, notExpected, "Stateless, don't store result getCount : "+result +" != "+notExpected);
		done();
	},
	getCount = function() {
		cdiRequestBean.getCount().event(function (evt) {
			result += evt.response;
			if(num<nb) {
				num++;
				getCount();
			} else checkResult();
		});
	};
	cdiRequestBean.init().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		result = 0;
		getCount();
	});
});
