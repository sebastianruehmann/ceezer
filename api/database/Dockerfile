FROM postgres:latest

# Environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=ceezer

# Copy the initialization script and CSV file into the Docker container
COPY data/init.sql /docker-entrypoint-initdb.d/
COPY data/projects.csv /docker-entrypoint-initdb.d/