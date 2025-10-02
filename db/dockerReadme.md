# Docker Cheat Sheet for Week1-Hello-API

This cheat sheet is designed to help you manage Docker containers, images, and builds efficiently for your `week1-hello-api` project. It includes commands for development, production, and CI/CD workflows.

---

## 1. Containers

### List running containers

```bash
docker ps
```

### List all containers (running + stopped)

```bash
docker ps -a
```

### Stop a running container

```bash
docker stop <container_name_or_id>
```

Example:

```bash
docker stop week1-api
```

### Stop multiple containers

```bash
docker stop container1 container2
```

or by ID:

```bash
docker stop a1b2c3d4e5 f6g7h8i9j0
```

### Force stop a container

```bash
docker kill <container_name_or_id>
```

### Remove a stopped container

```bash
docker rm <container_name_or_id>
```

### Stop and remove container in one line

```bash
docker stop week1-api && docker rm week1-api
```

### Stop all running containers

```bash
docker stop $(docker ps -q)
```

### Stop and remove all containers

```bash
docker stop $(docker ps -q) && docker rm $(docker ps -a -q)
```

---

## 2. Images

### List images

```bash
docker images
```

### Remove an image

```bash
docker rmi <image_name_or_id>
```

### Remove multiple images

```bash
docker rmi image1 image2 image3
```

### Remove dangling images (unused layers)

```bash
docker image prune
```

### Remove all unused images, networks, and containers

```bash
docker system prune -a
```

### Force remove an image

```bash
docker rmi -f <image_name_or_id>
```

---

## 3. Build / Rebuild Images

### Basic build

```bash
docker build -t week1-hello-api:prod .
```

### Rebuild without cache

```bash
docker build --no-cache -t week1-hello-api:prod .
```

### Remove old image before rebuild

```bash
docker rmi week1-hello-api:prod
docker build -t week1-hello-api:prod .
```

---

## 4. Run Containers

### Run a container

```bash
docker run -d -p 3000:3000 --name week1-api week1-hello-api:prod
```

* `-d` → detached mode (run in background)
* `-p 3000:3000` → map port 3000 on host to container
* `--name` → give your container a name

### Run with volume (for live updates)

```bash
docker run -d -p 3000:3000 -v $(pwd)/src/data:/app/dist/data --name week1-api week1-hello-api:prod
```

* Useful during development when you want live updates to JSON or other files without rebuilding the image.

---

## Tips for Workflow

1. Stop and remove old containers before starting a new build.
2. Copy static files (like `tasks.json`) in the Dockerfile to avoid `ENOENT` errors.
3. Use `--no-cache` during builds if dependencies or Dockerfile change.
4. Use volumes (`-v`) only for development; bake everything into the image for production.

---

> This cheat sheet is part of the **Week1-Hello-API Docker workflow** for local development and CI/CD pipelines.
