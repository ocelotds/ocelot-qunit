QUnit.module("cdiMarshallerBean2");
QUnit.test(".getFile()", function (assert) {
	var done = assert.async();
	cdiMarshallerBean2.getFile("/tmp/file").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		var file = evt.response;
		assert.equal(file.filename, "file");
		var exists = file.exists;
		cdiMarshallerBean2.exists(file).event(function (evt) {
			assert.equal(evt.type, "RESULT");
			var res = evt.response;
			assert.equal(res, exists);
			done();
		});
	});
});

