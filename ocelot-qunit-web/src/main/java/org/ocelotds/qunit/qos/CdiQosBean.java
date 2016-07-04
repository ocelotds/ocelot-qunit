/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.qos;

import java.util.Date;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
public class CdiQosBean {

	public Date getDate() {
		Date d = new Date();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException ex) {
		}
		return d;
	}
}
