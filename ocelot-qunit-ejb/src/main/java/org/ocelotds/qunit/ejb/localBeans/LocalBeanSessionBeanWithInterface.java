/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.ejb.localBeans;

import javax.ejb.Stateless;
import javax.ejb.LocalBean;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;

/**
 *
 * @author hhfrancois
 */
@Stateless
@LocalBean
@DataService(resolver = Constants.Resolver.EJB)
public class LocalBeanSessionBeanWithInterface implements LocalBeanSessionBeanInterface {

	@Override
	public int getValue() {
		return 50;
	}
}
