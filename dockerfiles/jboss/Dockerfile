FROM jboss/base-jdk:8

MAINTAINER Francois Achache <francois.achache@gmail.com>

# Set the WILDFLY_VERSION env variable 
ENV JBOSS_VERSION 7.0.0 

RUN cd $HOME \
	&& curl https://developers.redhat.com/download-manager/file/jboss-eap-$JBOSS_VERSION.zip | tar zx \
	&& mv $HOME/wildfly-$WILDFLY_VERSION $HOME/wildfly

