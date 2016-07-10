FROM java:openjdk-8-jdk

MAINTAINER Francois Achache <francois.achache@gmail.com>

ENV PROFILE glassfish

# Set the GLASSFISH env variable
ENV GLASSFIH_VERSION 4.1.1
ENV GLASSFISH_HOME /usr/local/glassfish4
ENV PATH $PATH:$GLASSFISH_HOME/bin

# Install glassfish
RUN apt-get update && apt-get install -y curl unzip zip inotify-tools && rm -rf /var/lib/apt/lists/* \
  && curl -L -o /tmp/glassfish-$GLASSFIH_VERSION.zip http://download.java.net/glassfish/$GLASSFIH_VERSION/release/glassfish-$GLASSFIH_VERSION.zip \
  && unzip /tmp/glassfish-$GLASSFIH_VERSION.zip -d /usr/local \
  && rm -f /tmp/glassfish-$GLASSFIH_VERSION.zip

# Define demo user
RUN $GLASSFISH_HOME/bin/asadmin start-domain domain1 \
  && echo "AS_ADMIN_USERPASSWORD=demo" > pwd.txt \
  && $GLASSFISH_HOME/bin/asadmin create-file-user --passwordfile=pwd.txt --groups USERGP demo \
  && $GLASSFISH_HOME/bin/asadmin stop-domain domain1 \
  && rm pwd.txt

# Expose the ports we're interested in
EXPOSE 8080 4848 8181

WORKDIR $GLASSFISH_HOME

# Expose workspace
VOLUME $GLASSFISH_HOME/glassfish/domains/domain1/autodeploy

# verbose mode for foreground mode
CMD asadmin start-domain --verbose domain1


