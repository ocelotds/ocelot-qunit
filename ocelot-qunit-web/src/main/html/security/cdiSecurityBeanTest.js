QUnit.module("cdiSecurityBean");
QUnit.test(".testGetCDIPrincipalName()", function (assert) {
	var login, done = assert.async();
	cdiSecurityBean.getCDIPrincipalName().event(function (evt) {
		assert.equal(evt.type, "RESULT");
		login = evt.response;
		assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
		done();
	});
});
QUnit.test(".testIsUserInRoleTrue()", function (assert) {
	var done = assert.async();
	cdiSecurityBean.isUserInRole("USERR").event(function (evt) {
		assert.equal(evt.type, "RESULT", "User should be in role : USERR");
		assert.equal(evt.response, true);
		done();
	});
});
QUnit.test(".testIsUserInRoleFalse()", function (assert) {
	var done = assert.async();
	cdiSecurityBean.isUserInRole("ADMINR").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		assert.equal(evt.response, false);
		done();
	});
});	


