#!/bin/sh

# Updates the system and installs postgresql dependencies
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# https://stackoverflow.com/questions/18223665/postgresql-query-from-bash-script-as-database-user-postgres
# Runs su as 'postgres' user & Access psql terminal
sudo -u postgres -H -- psql -U postgres -c "CREATE USER brunolnetto WITH PASSWORD '25c42b'";
sudo -u postgres -H -- psql -U postgres -c "CREATE DATABASE db_test OWNER brunolnetto;"
sudo -u postgres -H -- psql -U postgres -c "CREATE TABLE user_messages (name TEXT, message TEXT);"
sudo -u postgres -H -- psql -U postgres -c "CREATE TABLE users (id UUID PRIMARY KEY, name TEXT NOT NULL);"

