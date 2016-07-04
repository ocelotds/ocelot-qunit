/**
 * WithConstraintBean
 */
QUnit.module("cdiConstraintBean");
QUnit.test(".methodWithValidationArgumentsTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithValidationArguments(null, "foo", null).event(function (evt) {
		assert.equal(evt.type, "CONSTRAINT");
		var constraints = evt.response;
		assert.equal(constraints.length, 2);
		var c = constraints[0];
		if(c.index===0) {
			assert.equal(c.index, 0);
			assert.equal(c.name, 'arg0');
			c = constraints[1];
			assert.equal(c.index, 2);
			assert.equal(c.name, 'arg2');
		} else {
			assert.equal(c.index, 2);
			assert.equal(c.name, 'arg2');
			c = constraints[1];
			assert.equal(c.index, 0);
			assert.equal(c.name, 'arg0');
		}
		done();
	});
});	
QUnit.test(".methodWithArgumentNotNullTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentNotNull("foo").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentNotNull(null).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentNullTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentNull(null).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentNull("foo").event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentMaxTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentMax(8).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentMax(15).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentMinTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentMin(15).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentMin(8).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentFalseTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentFalse(false).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentFalse(true).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentTrueTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentTrue(true).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentTrue(false).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentFutureTest()", function (assert) {
	var done = assert.async();
	var fut = new Date();
	var past = new Date();
	fut.setMonth(fut.getMonth()+1);
	past.setMonth(past.getMonth()-1);
	cdiConstraintBean.methodWithArgumentFuture(fut.getTime()).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentFuture(past.getTime()).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentPastTest()", function (assert) {
	var done = assert.async();
	var fut = new Date();
	var past = new Date();
	fut.setMonth(fut.getMonth()+1);
	past.setMonth(past.getMonth()-1);
	cdiConstraintBean.methodWithArgumentPast(past.getTime()).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentPast(fut.getTime()).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentDecimalMaxTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentDecimalMax(20).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentDecimalMax(60).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentDecimalMinTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentDecimalMin(60).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentDecimalMin(20).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});	
QUnit.test(".methodWithArgumentPatternTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentPattern("123456").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentPattern("123a456").event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			done();
		});
	});
});
QUnit.test(".methodWithArgumentConstraintTest()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentConstraint({"name":"foo"}).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentConstraint({}).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			assert.equal(constraints[0].name, "arg0");
			assert.equal(constraints[0].prop, "name");
			done();
		});
	});
});
QUnit.test(".methodWithArgumentSize2_10Test()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentSize2_10("azerty").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentSize2_10("qwertyuiop^").event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			assert.equal(constraints[0].name, "arg0");
			done();
		});
	});
});
QUnit.test(".methodWithArgumentDigits3_2Test()", function (assert) {
	var done = assert.async();
	cdiConstraintBean.methodWithArgumentDigits3_2(123.45).event(function (evt) {
		assert.equal(evt.type, "RESULT");
		cdiConstraintBean.methodWithArgumentDigits3_2(1432432.34).event(function (evt) {
			assert.equal(evt.type, "CONSTRAINT");
			var constraints = evt.response;
			assert.equal(constraints.length, 1);
			assert.equal(constraints[0].name, "arg0");
			cdiConstraintBean.methodWithArgumentDigits3_2(432.3423434).event(function (evt) {
				assert.equal(evt.type, "CONSTRAINT");
				var constraints = evt.response;
				assert.equal(constraints.length, 1);
				assert.equal(constraints[0].name, "arg0");
				done();
			});
		});
	});
});

