/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.ejbLight;

import javax.ejb.Stateless;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;

/**
 *
 * @author hhfrancois
 */
@Stateless
@DataService(resolver = Constants.Resolver.EJB)
public class EjbLightStateless {

	private int count = 0;
	
	public int getCount() {
		return count++;
	}

	public void init() {
		count = 0;
	}
}
