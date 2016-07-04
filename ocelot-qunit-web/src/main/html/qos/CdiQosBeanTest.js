QUnit.module("cdiQosBean");
QUnit.test(".testGetDate() with QOS", function (assert) {
	var r1, r2, done = assert.async(), timer = setTimeout(checkResult, 4000);
	var checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.equal(r1, r2);
		done();
	};
	cdiQosBean.getDate().event(function (evt) {
		r1 = evt.response;
		assert.equal(evt.type, "RESULT", "r1 = "+new Date(r1).toString());
		if(r2) checkResult();
	});
	cdiQosBean.getDate().event(function (evt) {
		r2 = evt.response;
		assert.equal(evt.type, "RESULT", "r2 = "+new Date(r2).toString());
		if(r1) checkResult();
	});
});
QUnit.test(".testTimeout()", function (assert) {
	var done = assert.async();
	cdiQosBean.getDate().timeout(1000).event(function (evt) {
		assert.equal(evt.type, "FAULT", evt.response.message);
		done();
	});
});



