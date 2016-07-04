QUnit.module("localBeanSessionBean");
QUnit.test(".getValue()", function (assert) {
	var done = assert.async();
	localBeanSessionBean.getValue().event(function (evt) {
		assert.equal(evt.type, "RESULT", "Ejb localbean accessible");
		done();
	});
});
QUnit.module("localBeanSessionBeanWithInterface");
QUnit.test(".getValue()", function (assert) {
	var done = assert.async();
	localBeanSessionBeanWithInterface.getValue().event(function (evt) {
		assert.equal(evt.type, "RESULT", "Ejb localbeanWithInterface accessible");
		done();
	});
});


