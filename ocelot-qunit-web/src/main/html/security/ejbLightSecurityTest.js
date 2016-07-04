if(ejbLightSecurity !== undefined) {
	QUnit.module("ejbLightSecurity");
	QUnit.test(".testGetCDIPrincipalName()", function (assert) {
		var login, done = assert.async(), resultCount = 0, okCount = 0, timer = setTimeout(checkResult, 4000);
		var checkResult = function() {
			if(timer) clearTimeout(timer);
			assert.equal(okCount, 50, "50 response with login = "+login);
			done();
		};
		ejbLightSecurity.getCDIPrincipalName().event(function (evt) {
			login = evt.response;
			assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
			var getName = function () {
				ejbLightSecurity.getCDIPrincipalName().event(function (evt) {
					if (evt.response === login) okCount++;
					resultCount++;
					if (resultCount < 50) getName();
					else checkResult();
				});
			};
			getName();
		});
	});
	QUnit.test(".testIsUserInRoleTrue()", function (assert) {
		var done = assert.async();
		ejbLightSecurity.isUserInRole("USERR").event(function (evt) {
			assert.equal(evt.type, "RESULT", "User should be in role : USERR");
			assert.equal(evt.response, true);
			done();
		});
	});
	QUnit.test(".testIsUserInRoleFalse()", function (assert) {
		var done = assert.async();
		ejbLightSecurity.isUserInRole("ADMINR").event(function (evt) {
			assert.equal(evt.type, "RESULT");
			assert.equal(evt.response, false);
			done();
		});
	});
	QUnit.test(".callAuthorized()", function (assert) {
		var done = assert.async();
		ejbLightSecurity.callAuthorized().event(function (evt) {
			assert.equal(evt.type, "RESULT");
			done();
		});
	});
	QUnit.test(".callUnauthorized()", function (assert) {
		var done = assert.async();
		ejbLightSecurity.callUnauthorized().event(function (evt) {
			assert.equal(evt.type, "FAULT");
			done();
		});
	});
}
