FROM postgres:15
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB postgres

RUN mkdir -p ${PGDATA} /tmp /var/log/postgresql && chown -R postgres:postgres ${PGDATA} /tmp /var/log/postgresql
WORKDIR /data

# Set the user to run the container
USER postgres

# Copy the entrypoint script to the container
COPY addSchema.sh /data
USER root
RUN chmod +x /data/addSchema.sh

USER postgres

# Run the entrypoint script
CMD ["./addSchema.sh"]
COPY postgres-backup.sql  /data

EXPOSE 5432
