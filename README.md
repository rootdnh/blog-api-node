<a href="https://github.com/rootdnh/blog-frontend-react">Here is the Frontend </a>

(under development)

## This project is a complete blog API, with frontend, I hope to help some developers know how they can create something whole.

### Technologies
 * Redis
 * Node
 * Jest

## Steps to run 

* Create postgres container in docker.

```
sudo docker run --name blog-api-node \
-e POSTGRES_USER=blog-api-user \
-e POSTGRES_PASSWORD=yourpass \
-e POSTGRES_DB=blog-api \
-p 5432:5432 \
-d postgres
```

* Redis

```
   sudo docker run --name redis-blog -p 6378:6379 -d redis --requirepass "yourpass"
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

