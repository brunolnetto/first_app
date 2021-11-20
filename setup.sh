#!/bin/sh

# https://stackoverflow.com/questions/18223665/postgresql-query-from-bash-script-as-database-user-postgres
# Runs su as 'postgres' user & Access psql terminal
sudo -u postgres -H -- psql -U postgres -c "CREATE USER postgres WITH PASSWORD 'postgres' CREATEDB;"
sudo -u postgres -H -- psql -U postgres -c "CREATE DATABASE dbtest OWNER postgres;"
sudo -u postgres -H -- psql -U postgres -c "CREATE TABLE user_messages (name TEXT, message TEXT);"
sudo -u postgres -H -- psql -U postgres -c "CREATE TABLE users (id UUID PRIMARY KEY, name TEXT NOT NULL);"

