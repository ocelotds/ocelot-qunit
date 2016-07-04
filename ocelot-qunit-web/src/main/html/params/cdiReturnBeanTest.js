QUnit.module("cdiReturnBean");
QUnit.test(".getVoid()", function (assert) {
	var done = assert.async();
	cdiReturnBean.getVoid().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		done();
	});
});
QUnit.test(".getString()", function (assert) {
	var done = assert.async();
	cdiReturnBean.getString().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, "FOO");
		done();
	});
});
QUnit.test(".getNum()", function (assert) {
	var done = assert.async();
	cdiReturnBean.getNum().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, 1);
		done();
	});
});
QUnit.test(".getNumber()", function (assert) {
	var done = assert.async();
	cdiReturnBean.getNumber().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, 2);
		done();
	});
});
QUnit.test(".getBool()", function (assert) {
	var done = assert.async();
	cdiReturnBean.getBool().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, true);
		done();
	});
});
QUnit.test(".getBoolean()", function (assert) {
	var done = assert.async();
	cdiReturnBean.getBoolean().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, false);
		done();
	});
});
QUnit.test(".getDate()", function (assert) {
	var done = assert.async();
	var now = new Date();
	setTimeout(function () {
		cdiReturnBean.getDate().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			assert.ok(new Date(evt.response).getDate() === now.getDate(), "Same day...");
			done();
		});
	}, 50);
});
QUnit.test(".getResult()", function (assert) {
	var done = assert.async();
	cdiReturnBean.getResult().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, {"integer": 5});
		done();
	});
});
QUnit.test(".getCollectionInteger()", function (assert) {
	var i, expected = [], done = assert.async();
	for (i = 1; i < 5; i++) {
		expected.push(i);
	}
	cdiReturnBean.getCollectionInteger().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".getCollectionResult()", function (assert) {
	var i, expected = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		expected.push({"integer": 5});
	}
	cdiReturnBean.getCollectionResult().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".getCollectionOfCollectionResult()", function (assert) {
	var i, j, expected = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		var result = [];
		expected.push(result);
		for (j = 0; j < 4; j++) {
			result.push({"integer": 5});
		}
	}
	cdiReturnBean.getCollectionOfCollectionResult().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".getMapResult()", function (assert) {
	var i, expected = {}, done = assert.async();
	for (i = 1; i < 5; i++) {
		expected["" + i] = {"integer": 5};
	}
	cdiReturnBean.getMapResult().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});

