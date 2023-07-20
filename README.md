# Steps to run 

If you don't use linux OS remove the "sudo"


* Create postgres image in docker 

```
sudo docker run --name blog-api-node \
-e POSTGRES_USER=blog-api-user \
-e POSTGRES_PASSWORD=mysecretpass \
-e POSTGRES_DB=blog-api \
-p 5432:5432 \
-d postgres
```

* You can test the connection by doing it: 
```
sudo docker exec -it blog-api-node psql -U blog-api-user -d blog-api

```
* To start the docker image (just in linux rsrs)
```
./docker_start.sh

```

