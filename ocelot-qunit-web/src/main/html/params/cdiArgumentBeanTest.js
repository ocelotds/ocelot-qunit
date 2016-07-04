QUnit.module("cdiArgumentBean");
QUnit.test(".methodWithNum(bad_arg)", function (assert) {
	var done = assert.async();
	cdiArgumentBean.methodWithNum("badarg").event(function (evt) {
		assert.equal(evt.type, "FAULT", "A call with bad arg throw an exception");
		assert.equal(evt.response.classname, "java.lang.NoSuchMethodException", "Method should be not found");
		assert.equal(evt.response.message, "org.ocelotds.qunit.params.CdiArgumentBean.methodWithNum", "Message should be the bean name and method name");
		done();
	});
});
QUnit.test(".methodWithNum(i)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithNum_1";
	cdiArgumentBean.methodWithNum(1).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithNumber(i)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithNumber_1";
	cdiArgumentBean.methodWithNumber(1).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithBool(true)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithBool_true";
	cdiArgumentBean.methodWithBool(true).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithBool(false)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithBool_false";
	cdiArgumentBean.methodWithBool(false).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithBoolean(false)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithBoolean_false";
	cdiArgumentBean.methodWithBoolean(false).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithBoolean(true)", function (assert) {
	var expected, done = assert.async();
	expected = "methodWithBoolean_true";
	cdiArgumentBean.methodWithBoolean(true).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithDate(d)", function (assert) {
	var expected, d, done = assert.async();
	d = new Date();
	expected = "methodWithDate_" + d.getTime();
	cdiArgumentBean.methodWithDate(d.getTime()).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithResult(r)", function (assert) {
	var expected, r, done = assert.async();
	r = {"integer": 5};
	expected = "methodWithResult_" + r.integer;
	cdiArgumentBean.methodWithResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithArrayInteger(a)", function (assert) {
	var expected, r, done = assert.async();
	r = [1, 2, 3, 4, 5];
	expected = "methodWithArrayInteger_" + r.length;
	cdiArgumentBean.methodWithArrayInteger(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithCollectionInteger(c)", function (assert) {
	var expected, r, done = assert.async();
	r = [1, 2, 3, 4, 5];
	expected = "methodWithCollectionInteger_" + r.length;
	cdiArgumentBean.methodWithCollectionInteger(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithArrayResult(c)", function (assert) {
	var i, expected, r = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		r.push({"integer": 5});
	}
	expected = "methodWithArrayResult_" + r.length;
	cdiArgumentBean.methodWithArrayResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithCollectionResult(c)", function (assert) {
	var i, expected, r = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		r.push({"integer": 5});
	}
	expected = "methodWithCollectionResult_" + r.length;
	cdiArgumentBean.methodWithCollectionResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithMapResult(m)", function (assert) {
	var i, expected, r = {}, done = assert.async();
	for (i = 1; i < 5; i++) {
		r["" + i] = {"integer": 5};
	}
	expected = "methodWithMapResult_4";
	cdiArgumentBean.methodWithMapResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithCollectionOfCollectionResult(c)", function (assert) {
	var i, j, expected, r = [], done = assert.async();
	for (i = 0; i < 4; i++) {
		var result = [];
		r.push(result);
		for (j = 0; j < 4; j++) {
			result.push({"integer": 5});
		}
	}
	expected = "methodWithCollectionOfCollectionResult_" + r.length;
	cdiArgumentBean.methodWithCollectionOfCollectionResult(r).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithManyParameters(a, b, c, d)", function (assert) {
	var done = assert.async();
	var a = "text", b = 5, c = {"integer": 5}, d = ["a", "b"];
	var expected = "methodWithManyParameters a=" + a + " - b=" + b + " - c=" + c.integer + " - d:" + d.length;
	cdiArgumentBean.methodWithManyParameters(a, b, c, d).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithAlmostSameSignature(s)", function (assert) {
	var expected, done = assert.async();
	expected = "String";
	cdiArgumentBean.methodWithAlmostSameSignature("text").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithAlmostSameSignature(s1, s2)", function (assert) {
	var expected, done = assert.async();
	expected = "String2";
	cdiArgumentBean.methodWithAlmostSameSignature("text", "text").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodWithAlmostSameSignature(i)", function (assert) {
	var expected, done = assert.async();
	expected = "Integer";
	cdiArgumentBean.methodWithAlmostSameSignature(5).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.deepEqual(evt.response, expected);
		done();
	});
});
QUnit.test(".methodThatThrowException()", function (assert) {
	var done = assert.async();
	cdiArgumentBean.methodThatThrowException().event(function (evt) {
		assert.equal(evt.type, "FAULT");
		assert.notEqual(evt.response.classname.indexOf("MethodException"), -1);
		done();
	});
});

