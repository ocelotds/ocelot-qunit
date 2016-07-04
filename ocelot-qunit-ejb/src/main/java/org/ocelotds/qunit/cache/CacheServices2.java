/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.cache;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Random;
import javax.inject.Inject;
import org.ocelotds.annotations.DataService;
import org.ocelotds.annotations.JsCacheRemove;
import org.ocelotds.annotations.JsCacheRemoveAll;
import org.ocelotds.annotations.JsCacheRemoves;
import org.ocelotds.annotations.JsCacheResult;
import org.ocelotds.qunit.objects.Result;

/**
 *
 * @author hhfrancois
 */
@DataService
public class CacheServices2 {

	private final Random random = new Random();
	
	@Inject
	private CacheRemoveBusiness2 crb;

	@JsCacheResult(minute = 1)
	public Collection<Integer> methodCached() {
		Collection<Integer> result = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			result.add(random.nextInt(100));
		}
		return result;
	}

	@JsCacheResult(minute = 1, keys = {"r.integer"})
	public Collection<Integer> methodCachedWithArg(Result r) {
		Collection<Integer> result = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			result.add(random.nextInt(100));
		}
		return result;
	}

	@JsCacheRemove(cls = CacheServices2.class, methodName = "methodCached")
	public void methodRemoveCache() {
	}

	public void removeCacheFromBusiness() {
		crb.removeCache();
	}

	@JsCacheRemove(cls = CacheServices2.class, methodName = "methodCachedWithArg", keys = {"i"})
	public void methodRemoveCacheWithArg(int i, long l) {
	}

	@JsCacheRemove(cls = CacheServices2.class, methodName = "methodCachedWithArg", keys = {})
	public void methodRemoveAllCacheResultOfMethod() {
	}
	
	@JsCacheRemoveAll
	public void methodRemoveAllCache() {
	}

	@JsCacheRemoves({
		@JsCacheRemove(cls = CacheServices2.class, methodName = "methodCached", keys = {}),
		@JsCacheRemove(cls = CacheServices2.class, methodName = "methodCachedWithArg", keys = {"r.integer"})
	})
	public void methodRemovesCache(Result r) {
	}
	
}
