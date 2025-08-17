# Day 13 - Docker

## Dockerfile Example
```dockerfile
FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD [ "npm", "start" ]
```

### Dockerfile Breakdown
- `FROM node:alpine` - Uses the lightweight Alpine Linux-based Node.js image as the base
- `WORKDIR /app` - Sets the working directory inside the container to `/app`
- `COPY package.json ./` - Copies package.json to the working directory (optimization for caching)
- `RUN npm install` - Installs dependencies (runs during image build)
- `COPY ./ ./` - Copies all remaining files to the working directory
- `CMD [ "npm", "start" ]` - Default command to run when container starts

## Essential Docker Commands

### Building Images
```bash
# Build an image from Dockerfile in current directory
docker build -t myapp:latest .

# Build with custom Dockerfile name
docker build -f Dockerfile.prod -t myapp:prod .

# Build with build arguments
docker build --build-arg NODE_ENV=production -t myapp .
```

### Running Containers
```bash
# Run container in foreground
docker run myapp

# Run container in background (detached)
docker run -d myapp

# Run with port mapping
docker run -p 3000:3000 myapp

# Run with environment variables
docker run -e NODE_ENV=production myapp

# Run with volume mounting
docker run -v /host/path:/container/path myapp

# Run with custom name
docker run --name my-container myapp
```

### Container Management
```bash
# Remove a container
docker rm container_name_or_id

# Remove a running container (force)
docker rm -f container_name_or_id

# Remove all stopped containers
docker rm $(docker ps -a -q)
```

### Viewing Containers
```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List containers with custom format
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# List only container IDs
docker ps -q
```

## Docker Compose

### docker-compose.yml Example
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:password@db:5432/myapp
    volumes:
      - ./src:/app/src
      - node_modules:/app/node_modules
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    restart: always

volumes:
  postgres_data:
  node_modules:

networks:
  default:
    driver: bridge
```

### Docker Compose Commands
```bash
# Start services
docker-compose up

# Start services in background
docker-compose up -d

# Build and start services
docker-compose up --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs web

# Scale a service
docker-compose up --scale web=3
```

## Restart Policies

Docker containers can be configured with different restart policies:

### Available Restart Policies

1. **no** (default)
   - Container will not restart automatically
   ```bash
   docker run --restart=no myapp
   ```

2. **always**
   - Always restart the container if it stops
   - Starts automatically on Docker daemon startup
   ```bash
   docker run --restart=always myapp
   ```

3. **unless-stopped**
   - Restart unless explicitly stopped by user
   - Won't start on Docker daemon startup if manually stopped
   ```bash
   docker run --restart=unless-stopped myapp
   ```

4. **on-failure[:max-retries]**
   - Restart only if container exits with non-zero status
   - Optional maximum retry count
   ```bash
   docker run --restart=on-failure:5 myapp
   ```

### Restart Policy in Docker Compose
```yaml
services:
  web:
    image: myapp
    restart: unless-stopped  # or always, no, on-failure
```

## Container Exit Status Codes

Understanding exit codes helps with debugging and monitoring:

### Common Exit Codes

| Exit Code | Meaning | Description |
|-----------|---------|-------------|
| 0 | Success | Container exited successfully |
| 1 | General Error | Catchall for general errors |
| 2 | Misuse of Shell Command | Missing keyword or command |
| 125 | Docker Daemon Error | Docker run command failed |
| 126 | Container Command Not Executable | Permission issue or command not found |
| 127 | Container Command Not Found | Command not found in PATH |
| 128 | Invalid Argument to Exit | Exit code out of range |
| 130 | Container Terminated by SIGINT | Ctrl+C interrupt |
| 137 | Container Terminated by SIGKILL | Kill signal (often OOM) |
| 143 | Container Terminated by SIGTERM | Termination signal |

### Checking Exit Codes
```bash
# View exit code of last container
docker ps -a

# Get detailed container information
docker inspect container_name

# View container logs with timestamps
docker logs -t container_name
```

### Handling Exit Codes in Scripts
```bash
#!/bin/bash
docker run myapp
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "Container ran successfully"
elif [ $EXIT_CODE -eq 137 ]; then
    echo "Container was killed (possibly OOM)"
else
    echo "Container failed with exit code: $EXIT_CODE"
fi
```

## Best Practices

### Dockerfile Optimization
- Use multi-stage builds for smaller images
- Leverage build cache by copying package files first
- Use `.dockerignore` to exclude unnecessary files
- Run as non-root user when possible
- Use specific image tags instead of `latest`

### Container Management
- Always use restart policies for production containers
- Monitor container resource usage
- Implement health checks
- Use proper logging strategies
- Keep containers stateless when possible

### Security
- Regularly update base images
- Scan images for vulnerabilities
- Use secrets management for sensitive data
- Limit container privileges
- Use official images when possible

## Additional Useful Commands

```bash
# View container resource usage
docker stats

# Execute command in running container
docker exec -it container_name bash

# Copy files between container and host
docker cp container_name:/path/file /host/path

# View container logs in real-time
docker logs -f container_name

# Clean up unused resources
docker system prune

# Remove unused images
docker image prune

# View Docker disk usage
docker system df
```