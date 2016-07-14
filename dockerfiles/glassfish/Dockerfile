FROM glassfish

MAINTAINER Francois Achache <francois.achache@gmail.com>

# Define demo user
RUN bin/asadmin start-domain domain1 \
  && echo "AS_ADMIN_USERPASSWORD=demo" > pwd.txt \
  && bin/asadmin create-file-user --passwordfile=pwd.txt --groups USERGP demo \
  && bin/asadmin stop-domain domain1 \
  && rm pwd.txt


