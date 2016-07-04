/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.params;

import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import org.ocelotds.qunit.objects.MethodException;
import org.ocelotds.qunit.objects.Result;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
public class CdiArgumentBean {

	public String methodWithNum(int i) {
		return "methodWithNum_" + i;
	}

	public String methodWithNumber(Integer i) {
		return "methodWithNumber_" + i;
	}

	public String methodWithBool(boolean i) {
		return "methodWithBool_" + i;
	}

	public String methodWithBoolean(Boolean i) {
		return "methodWithBoolean_" + i;
	}

	public String methodWithDate(Date i) {
		return "methodWithDate_" + ((i != null) ? i.getTime() : null);
	}

	public String methodWithResult(Result i) {
		return "methodWithResult_" + ((i != null) ? i.getInteger() : null);
	}

	public String methodWithArrayInteger(Integer[] i) {
		return "methodWithArrayInteger_" + ((i != null) ? i.length : null);
	}

	public String methodWithCollectionInteger(Collection<Integer> i) {
		return "methodWithCollectionInteger_" + ((i != null) ? i.size() : null);
	}

	public String methodWithArrayResult(Result[] i) {
		return "methodWithArrayResult_" + ((i != null) ? i.length : null);
	}

	public String methodWithCollectionResult(Collection<Result> i) {
		return "methodWithCollectionResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithMapResult(Map<String, Result> i) {
		return "methodWithMapResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithCollectionOfCollectionResult(Collection<Collection<Result>> i) {
		return "methodWithCollectionOfCollectionResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithManyParameters(String a, int b, Result c, Collection<String> d) {
		return "methodWithManyParameters a=" + a + " - b=" + b + " - c=" + ((c != null) ? c.getInteger() : null) + " - d:" + ((d != null) ? d.size() : null);
	}

	public void methodThatThrowException() throws MethodException {
		throw new MethodException("message of exception");
	}

	public String methodWithAlmostSameSignature(Integer i) {
		return "Integer";
	}

	public String methodWithAlmostSameSignature(String i) {
		return "String";
	}

	public String methodWithAlmostSameSignature(String i, String s) {
		return "String2";
	}
}
