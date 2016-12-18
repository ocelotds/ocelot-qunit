#!/bin/bash
PHANTOMHOME=/home/hhfrancois/phantomjs/bin
server_available(){
	res=`curl -sL -w "%{http_code}" "$1" -o /dev/null`
   if [ 200 == $res ];
	then
		return 1
	fi
	return 0
}
wait_response(){
	while server_available $1 eq 1; do sleep 1; done
}

processTests() {
	CONTAINERNAME=$1
	TESTPORT=$2

	echo "pull ocelotds/qunit:$CONTAINERNAME"
	docker pull ocelotds/qunit:$CONTAINERNAME

	echo process tests in $CONTAINERNAME

	# remove container if exist
	docker rm -f $CONTAINERNAME

	# run container
	echo Launch docker container $CONTAINERNAME
	docker run -d -P --name $CONTAINERNAME ocelotds/qunit:$CONTAINERNAME

	# get http-port
	HTTPPORT=`docker exec $CONTAINERNAME ./http-port.sh`
	echo $CONTAINERNAME port : $TESTPORT/$HTTPPORT
	docker rm -f $CONTAINERNAME
	docker run -d -p $TESTPORT:$HTTPPORT --name $CONTAINERNAME ocelotds/qunit:$CONTAINERNAME

	echo waiting $CONTAINERNAME available
	#wait server is available
	wait_response "http://localhost:$TESTPORT"

	echo deploy application in $CONTAINERNAME
	# copy application in container
	# deploy application
	docker exec $CONTAINERNAME ./deploy.sh /ocelot-qunit-ear.ear

	# wait application is deployed
	wait_response "http://localhost:$TESTPORT/test/ocelot/core.js"
	echo application deployed in $CONTAINERNAME
	echo launch tests in $CONTAINERNAME
	# launch tests
	$PHANTOMHOME/phantomjs travis/test.js $CONTAINERNAME $TESTPORT
	result=$?
	echo "SUCCESS : $result"

	# remove container
	docker rm -f  $CONTAINERNAME
	return $result
}
# Containers list
containers=( glassfish4 payara4 wildfly9 wildfly10)

echo phantomjs version : `$PHANTOMHOME/phantomjs -v`

declare -a pids
idx=0
for CONTAINERNAME in ${containers[@]}
do	
	processTests $CONTAINERNAME 808$idx &
	pids[$idx]=$!
	let "idx += 1"
done

success=0
for pid in ${pids[@]}
do
	wait $pid
	let "success += $?"
done

echo Success $success

