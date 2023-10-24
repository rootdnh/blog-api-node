<a href="https://github.com/rootdnh/blog-frontend-react">Here is the Frontend </a>

(under development)

# Steps to run 

* Create postgres container in docker (duplicate this for dev version)

```
sudo docker run --name blog-api-node \
-e POSTGRES_USER=blog-api-user \
-e POSTGRES_PASSWORD=youtpass \
-e POSTGRES_DB=blog-api \
-p 5432:5432 \
-d postgres
```

* Redis

```
   sudo docker run --name redis-blog -p 6378:6379 -d redis --requirepass "yourpass"
```

* Dev version (written here to help)

```
sudo docker run --name blog-api-dev \
-e POSTGRES_USER=blog-api-dev \
-e POSTGRES_PASSWORD=yourpass \ 
-e POSTGRES_DB=blog-api-dev \
-p 5433:5432 \
 -d postgres
```

* You can test the connection by doing it: 
```
sudo docker exec -it blog-api-node psql -U blog-api-user -d blog-api

```
* To start the docker container:
```
./docker_start.sh

```

* I use logrotate to rotating the .log files (soon i want to create .yaml to help)

