/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.security;

import javax.enterprise.inject.Produces;
import org.ocelotds.Constants;
import org.ocelotds.annotations.OcelotConfiguration;

/**
 *
 * @author hhfrancois
 */
public class RolesConfigurationProducer {

//	@Produces
//	@OcelotConfiguration(Constants.Options.DASHBOARD_ROLES)
	String getRole() {
		return "USERR";
	}
}
