FROM jboss/base-jdk:8

MAINTAINER Francois Achache <francois.achache@gmail.com>

# Set the WILDFLY_VERSION env variable 
ENV WILDFLY_VERSION 10.0.0.Final 

# Add the WildFly distribution to /opt, and make wildfly the owner of the extracted tar content 
# Make sure the distribution is available from a well-known place 
RUN cd $HOME \
	&& curl http://download.jboss.org/wildfly/$WILDFLY_VERSION/wildfly-$WILDFLY_VERSION.tar.gz | tar zx \
	&& mv $HOME/wildfly-$WILDFLY_VERSION $HOME/wildfly

# Set the JBOSS_HOME env variable 
ENV JBOSS_HOME /opt/jboss/wildfly

# Expose the ports we're interested in 
EXPOSE 8080 9990

# Define demo user
RUN cd $HOME && pwd && wildfly/bin/add-user.sh -a demo demo \
 && echo "demo=USERR" >> wildfly/domain/configuration/application-roles.properties \
 && wildfly/bin/add-user.sh admin admin
# && sed -i 's/other/file/g' wildfly/domain/configuration/domain.xml \

COPY deploy.sh /opt/jboss/wildfly/deploy.sh

WORKDIR $JBOSS_HOME

# Set the default command to run on boot 
# This will boot WildFly in the standalone mode and bind to all interface 
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]


