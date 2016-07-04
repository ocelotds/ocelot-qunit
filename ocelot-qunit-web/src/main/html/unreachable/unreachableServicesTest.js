QUnit.module("unreachableServices");
QUnit.test(".getVoid()", function (assert) {
	var done = assert.async();
	unreachableServices.getVoid().event(function (evt) {
		assert.equal(evt.type, "FAULT", "" + evt.response.classname + " : " + evt.response.message);
		done();
	});
});
var unreachableServices = (function () {
	'use strict';
	var _ds="org.ocelotds.ocelot.UnreachableServices";
	return{
		getVoid: function () {
			return promiseFactory.create(_ds, "781c53ed36c8e09e518531b803fba95f", "getVoid", false, [], []);
		}
	};
})();

