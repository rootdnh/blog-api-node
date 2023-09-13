<a href="https://github.com/rootdnh/blog-frontend-react">Frontend</a>

# Steps to run 

If you don't use linux OS remove the "sudo"


* Create postgres image in docker (duplicate this for dev version)

```
sudo docker run --name blog-api-node \
-e POSTGRES_USER=blog-api-user \
-e POSTGRES_PASSWORD=mysecretpass \
-e POSTGRES_DB=blog-api \
-p 5432:5432 \
-d postgres
```

* Dev version (written here to help)

```
sudo docker run --name blog-api-dev \
-e POSTGRES_USER=blog-api-dev \
-e POSTGRES_PASSWORD=mysecretpass \ 
-e POSTGRES_DB=blog-api-dev \
-p 5433:5432 \
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

