QUnit.module("ejbLightStatefullBean");
if(ejbLightStatefullBean !== undefined) {
	QUnit.test(".getCount()", function (assert) {
		var result = 0, nb = 10, num = 0, done = assert.async(), 
		timer = setTimeout(checkResult, 2000),
		expected = ((nb+1) * nb)/2,
		checkResult = function() {
			if(timer) clearTimeout(timer);
			assert.equal(result, expected, "Statefull, store result getCount : "+result +" != "+expected);
			done();
		},
		getCount = function() {
			ejbLightStatefullBean.getCount().event(function (evt) {
				assert.equal(evt.type, "RESULT");
				result += evt.response;
				if(num<nb) {
					num++;
					getCount();
				} else checkResult();
			});
		};
		ejbLightStatefullBean.init().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			result = 0;
			getCount();
		});
	});
}
