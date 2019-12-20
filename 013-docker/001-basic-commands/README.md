Pull container from DockerHub and run

```bash
docker run --name mongodb -p 0.0.0.0:27017:27017 mongo:4.2
```

Display all containers

```bash
docker ps # only running
docker ps -a # all
```

Display all images

```bash
docker images
```
