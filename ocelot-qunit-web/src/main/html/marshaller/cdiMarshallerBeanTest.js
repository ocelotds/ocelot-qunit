QUnit.module("cdiMarshallerBean");
QUnit.test(".getFile()", function (assert) {
	var done = assert.async();
	cdiMarshallerBean.getFile("/tmp/file").event(function (evt) {
		assert.equal(evt.type, "RESULT");
		var file = evt.response;
		assert.equal(file.filename, "file");
		var exists = file.exists;
		cdiMarshallerBean.exists(file).event(function (evt) {
			assert.equal(evt.type, "RESULT");
			var res = evt.response;
			assert.equal(res, exists);
			done();
		});
	});
});

