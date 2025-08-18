# day 14

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

Volumes are used to:  
- Persiste database data
- cache dependencies
- enable hot realoading during development

Without volumes:  
- when the container is removed, all data inside is gone.

- we would reinstall dependencies every time.

- we couldn’t edit code locally and see changes in the container.