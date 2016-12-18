var nbMsgToBroadcast = 500;
function S4() {
	 return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
// generate an unique ident
function getGuid() {
	return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

QUnit.module("cdiTopicBean");
QUnit.test(".onMessage()", function (assert) {
	var timer, done = assert.async(), sub, topic = getGuid();
	cdiTopicBean.setGlobalTopicAccess(true).then(function () {
		sub= subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Subscription to '"+topic+"' : ok.");
			assert.equal(evt.response, 1, "One subscriber.");
			cdiTopicBean.publish(topic, 1).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Call publish "+topic+" method : ok.");
			});
		}).message(function (msg) {
			assert.equal(msg, "Message From server 1", "Receive message in '"+topic+"' : ok.");
			sub.unsubscribe().event(function (evt) {
				assert.equal(evt.type, "RESULT", "Unsubscription to '"+topic+"' : ok.");
				window.clearTimeout(timer);
				done();
			});
		});
		assert.equal(sub.topic, topic, "topic name '"+topic+"' is accessible");
	});
	timer = setTimeout(function () {
		assert.equal(0, 1, "Receive 0 messages");
		sub.unsubscribe(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Unsubscription to '"+topic+"' : ok.");
			done();
		});
	}, 500);
});
QUnit.test(".onMessages()", function (assert) {
	var sub, result = 0, expected = nbMsgToBroadcast, done, i, query = location.search, params = query.split("&"), timer, topic = getGuid();
	var checkResult = function() {
		if(timer) clearTimeout(timer);
		assert.equal(result, expected, "Receive " + result + "/" + expected + " messages");
		sub.unsubscribe().event(function (evt) {
			assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
			done();
		});
	};
	for (i = 0; i < params.length; i++) {
		var param = params[i].replace("?", "");
		var keyval = param.split("=");
		if (keyval.length === 2) {
			if (keyval[0] === "nbmsg") {
				expected = parseInt(keyval[1]);
			}
		}
	}
	timer = setTimeout(checkResult, 50 * expected);
	done = assert.async();
	cdiTopicBean.setGlobalTopicAccess(true).then(function () {
		sub = subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Subscription to '"+topic+"' : ok.");
			cdiTopicBean.publish(topic, expected).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Call publish to '"+topic+"'(" + expected + ") method : ok.");
			});
		}).message(function (msg) {
			result++;
			assert.ok(true, "" + msg + " : (" + result + ")");
			if (result === expected) {
				checkResult();
			}
		});
	});
});
QUnit.test(".testGlobalTopic()", function (assert) {
	var sub, timer, topic = "GlobalTopic", expected = "my message", done = assert.async();
	cdiTopicBean.setGlobalTopicAccess(true).then(function () {
		sub = subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Subscription to '" + topic + "' : ok.");
			cdiTopicBean.sendToGlobalTopic(expected).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Call sendToGlobalTopic(" + expected + ") method : ok.");
				sub.message(function (msg) {
					window.clearTimeout(timer);
					assert.equal(msg, expected, "Receive msg in GlobalTopic : " + msg);
					sub.unsubscribe();
					done();
				});
			});
			timer = setTimeout(function () {
				assert.ok(false, "Timeout, didn't receive msg in " + topic + " subscriber.");
				done();
			}, 200);
		});
	});
});
QUnit.test(".testSpecificTopic()", function (assert) {
	var sub, timer, topic = getGuid(), expected = "my message", done = assert.async();
	cdiTopicBean.setGlobalTopicAccess(true).then(function () {
		sub = subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "RESULT", "Subscription to '" + topic + "' : ok.");
			cdiTopicBean.sendToSpecificTopic(expected, topic).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Call sendToSpecificTopic(" + expected + ", " + topic + ")");
				sub.message(function (msg) {
					window.clearTimeout(timer);
					assert.equal(msg, expected, "Receive msg in SpecificTopic(" + topic + ") : " + msg);
					sub.unsubscribe();
					done();
				});
			});
			timer = setTimeout(function () {
				assert.ok(false, "Timeout, didn't receive msg in " + topic + " subscriber.");
				sub.unsubscribe();
				done();
			}, 200);
		});
	});
});
QUnit.test(".testGlobalTopicAccess()", function (assert) {
	var sub, done = assert.async(), topic = getGuid();
	cdiTopicBean.setGlobalTopicAccess(false).then(function () {
		subscriberFactory.createSubscriber(topic).event(function (evt) {
			assert.equal(evt.type, "FAULT", "Subscription to '"+topic+"' failed : ok.");
			cdiTopicBean.setGlobalTopicAccess(true).then(function() {
				sub = subscriberFactory.createSubscriber(topic).event(function (evt) {
						assert.equal(evt.type, "RESULT", "Subscription to '"+topic+"' : ok.");
						sub.unsubscribe();
						done();
				});
			});
		});
	});
});
QUnit.test(".testSpecificTopicAccess()", function (assert) {
	var sub1, sub2, done = assert.async(), topic = getGuid();
	cdiTopicBean.setGlobalTopicAccess(true).then(function () {
		cdiTopicBean.setSpecificTopicAccess(false).then(function () {
			sub1 = subscriberFactory.createSubscriber(topic).event(function (evt) {
				assert.equal(evt.type, "RESULT", "Subscription to '"+topic+"' : ok.");
				subscriberFactory.createSubscriber("mytopic").event(function (evt) {
					assert.equal(evt.type, "FAULT", "Subscription to '"+"mytopic"+"' failed : ok.");
					cdiTopicBean.setSpecificTopicAccess(true).then(function () {
						sub2 = subscriberFactory.createSubscriber("mytopic").event(function (evt) {
							assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
							sub2.unsubscribe();
							sub1.unsubscribe();
							done();
						});
					});
				});
			});
		});
	});
});
QUnit.test(".testMultiSpecificTopicAccess('mytopic1')", function (assert) {
	var sub, done = assert.async();
	cdiTopicBean.setGlobalTopicAccess(true).then(function () {
		cdiTopicBean.setMultiSpecificTopicAccess(false).then(function () {
			subscriberFactory.createSubscriber("mytopic1").event(function (evt) {
				assert.equal(evt.type, "FAULT", "Subscription to 'mytopic1' failed : ok.");
				cdiTopicBean.setMultiSpecificTopicAccess(true).then(function () {
					sub = subscriberFactory.createSubscriber("mytopic1").event(function (evt) {
						assert.equal(evt.type, "RESULT", "Subscription to 'mytopic1' : ok.");
						sub.unsubscribe();
						done();
					});
				});
			});
		});
	});
});
QUnit.test(".testMultiSpecificTopicAccess('mytopic2')", function (assert) {
	var sub, done = assert.async();
	cdiTopicBean.setGlobalTopicAccess(true).then(function () {
		cdiTopicBean.setMultiSpecificTopicAccess(false).then(function () {
			subscriberFactory.createSubscriber("mytopic2").event(function (evt) {
				assert.equal(evt.type, "FAULT", "Subscription to 'mytopic2' failed : ok.");
				cdiTopicBean.setMultiSpecificTopicAccess(true).then(function () {
					sub = subscriberFactory.createSubscriber("mytopic2").event(function (evt) {
						assert.equal(evt.type, "RESULT", "Subscription to 'mytopic2' : ok.");
						sub.unsubscribe();
						done();
					});
				});
			});
		});
	});
});
QUnit.test(".testMessageAccess()", function (assert) {
	var sub, done = assert.async();
	sub = subscriberFactory.createSubscriber("string5topic").event(function (evt) {
		cdiTopicBean.sendToString5topic("abc");
		cdiTopicBean.sendToString5topic("abcdef");
	}).message(function(msg) {
		assert.equal(msg, "abcdef");
	});
	setTimeout(function() {
		sub.unsubscribe();
		done();
	}, 1000);
});
QUnit.test(".testMessageAccessBis()", function (assert) {
	var sub, done = assert.async();
	sub = subscriberFactory.createSubscriber("string5topicBis").event(function (evt) {
		cdiTopicBean.sendToString5topicBis("abc");
		cdiTopicBean.sendToString5topicBis("abcdef");
	}).message(function(msg) {
		assert.equal(msg, "abcdef");
	});
	setTimeout(function() {
		sub.unsubscribe();
		done();
	}, 1000);
});
QUnit.test(".testMessageAccess10()", function (assert) {
	var sub, done = assert.async();
	sub = subscriberFactory.createSubscriber("string10topic").event(function (evt) {
		cdiTopicBean.sendToString10topic("abc");
		cdiTopicBean.sendToString10topic("abcdefabcdef");
	}).message(function(msg) {
		assert.equal(msg, "abcdefabcdef");
	});
	setTimeout(function() {
		sub.unsubscribe();
		done();
	}, 1000);
});


