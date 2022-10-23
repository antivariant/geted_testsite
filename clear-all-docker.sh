docker stop $(docker ps -aq)
# docker stop $(docker ps --filter status=running -q)

docker rm $(docker ps -aq)
# docker rm $(docker ps --filter status=exited -q)

docker rmi $(docker images -q)