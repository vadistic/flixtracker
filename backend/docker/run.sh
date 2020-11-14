docker build -t nest-prisma-server -f docker/Dockerfile .
docker run -d -t -p 3000:3000 nest-prisma-server
