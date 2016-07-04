/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.qunit.params;

import java.io.File;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import org.ocelotds.marshalling.annotations.JsonMarshaller;
import org.ocelotds.marshalling.annotations.JsonUnmarshaller;
import org.ocelotds.qunit.marshallers.FileMarshaller;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
public class CdiMarshallerBean {

	@JsonMarshaller(FileMarshaller.class)
	public File getFile(String path) {
		return new File(path);
	}

	public boolean exists(@JsonUnmarshaller(FileMarshaller.class) File file) {
		return file.exists();
	}
}
