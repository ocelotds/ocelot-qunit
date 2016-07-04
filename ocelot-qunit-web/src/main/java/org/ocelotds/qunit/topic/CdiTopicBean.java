/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.topic;

import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import org.ocelotds.annotations.JsTopic;
import org.ocelotds.annotations.JsTopicName;
import org.ocelotds.messaging.MessageEvent;
import org.ocelotds.messaging.MessageToClient;
import javax.enterprise.event.Event;
import javax.enterprise.inject.Any;
import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import org.ocelotds.qunit.topic.GlobalTopicAC;
import org.ocelotds.qunit.topic.SpecificTopicAC;
import org.ocelotds.qunit.topic.MultiSpecificTopicAC;
import org.ocelotds.security.JsTopicAccessController;
import org.ocelotds.security.JsTopicCtrlAnnotationLiteral;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
public class CdiTopicBean {


	@Inject
	private GlobalTopicAC globalTopicAC;

	@Inject
	@Any
	Instance<JsTopicAccessController> myTopicAccessControllers;
	
	JsTopicAccessController getJsTopicAccessController() {
		return myTopicAccessControllers.select(new JsTopicCtrlAnnotationLiteral("mytopic")).get();
	}

	@Inject
	@Any
	private MultiSpecificTopicAC multiSpecificTopicAC;

	public void setGlobalTopicAccess(boolean b) {
		globalTopicAC.setAccess(b);
	}

	public void setSpecificTopicAccess(boolean b) {
		((SpecificTopicAC) getJsTopicAccessController()).setAccess(b);
	}

	public void setMultiSpecificTopicAccess(boolean b) {
		multiSpecificTopicAC.setAccess(b);
	}

	public void getVoid() {
	}

	@Inject
	@MessageEvent
	Event<MessageToClient> wsEvent;

	public void publish(String topic, int nb) {
		for (int i = 1; i <= nb; i++) {
			MessageToClient messageToClient = new MessageToClient();
			messageToClient.setId(topic);
			messageToClient.setResponse("Message From server " + i);
			wsEvent.fire(messageToClient);
		}
	}

	@JsTopic(value = "GlobalTopic")
	public String sendToGlobalTopic(String message) {
		return message;
	}

	@JsTopic
	public String sendToSpecificTopic(String message, @JsTopicName String topic) {
		return message;
	}

	@JsTopic(value = "string5topic")
	public String sendToString5topic(String message) {
		return message;
	}

	@JsTopic(value = "string5topicBis")
	public String sendToString5topicBis(String message) {
		return message;
	}

	@JsTopic(value = "string10topic")
	public String sendToString10topic(String message) {
		return message;
	}
}
