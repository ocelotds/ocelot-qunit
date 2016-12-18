"use strict";
var page = require('webpage').create();
var args = require('system').args;
var servername = args[1];
var port = args[2];

page.includeJs("http://localhost:"+port+"/test/js/vendors.js", function () {
});
page.includeJs("http://localhost:"+port+"/test/ocelot/core.js", function () {
});
page.includeJs("http://localhost:"+port+"/test/ocelot/services.js", function () {
});
page.includeJs("http://localhost:"+port+"/test/js/main.js", function () {
});

page.open("http://localhost:"+port+"/test/index.html", function (status) {
	page.onLoadFinished = function () {
		console.log("Logged, page loaded, testing....");
		waitEndTests();
	};
	authentication('demo', 'demo');
});
function waitEndTests() {
	var el = page.evaluate(function(){
		return document.getElementById('qunit-testresult');
	});
	setTimeout(function (el, prevNb) {
		if(!isCompleted(el)) {
			var nb = getNbTestsDone();
			console.log("["+servername+"] Nb tests done : ", nb);
			if (prevNb === nb) {
				console.log("["+servername+"] Timeout...");
				page.render(servername+" - timeout.png");
				phantom.exit(0);
			} else {
				waitEndTests();
			}
		} else {
			var success = isSucceed(el);
			console.log("["+servername+"] All tests done", success);
			page.render(servername+" - "+(success?"succeed":"failed")+".png");
			phantom.exit(success);
		}
	}, 4000, el, getNbTestsDone());
}
function isSucceed(el) {
	return el && el.innerText && el.innerText.indexOf(' 0 failed.')!==-1;
}
function isCompleted(el) {
	return el && el.innerText && el.innerText.indexOf('completed')!==-1;
}
function getNbTestsDone() {
	return page.evaluate(function(){
		return document.getElementById('qunit-tests').getElementsByTagName("li").length;
	});
}
function authentication(user, pwd) {
	page.evaluate(function (user, pwd) {
		document.getElementById('j_username').value = user;
		document.getElementById('j_password').value = pwd;
		document.getElementById('authform').submit();
	}, user, pwd);
	
}