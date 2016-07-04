/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.security;

import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import java.security.Principal;
import javax.inject.Inject;
import org.ocelotds.context.OcelotContext;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
public class CdiSecurityBean {

	@Inject
	private Principal principal;

	@Inject
	private OcelotContext ctx;

	public String getCDIPrincipalName() {
		return principal.getName();
	}

	public boolean isUserInRole(String role) {
		return ctx.isUserInRole(role);
	}
}
