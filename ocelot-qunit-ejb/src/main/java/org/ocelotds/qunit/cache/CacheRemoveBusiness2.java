/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.cache;

import org.ocelotds.annotations.JsCacheRemove;

/**
 *
 * @author hhfrancois
 */
public class CacheRemoveBusiness2 {
	@JsCacheRemove(cls = CacheServices2.class, methodName = "methodCached")
	public void removeCache() {
		
	}
}
