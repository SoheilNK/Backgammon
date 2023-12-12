#!/bin/bash

# Define Nginx configuration file path
NGINX_CONF="/etc/nginx/nginx.conf"

# Backup the original configuration file
sudo cp $NGINX_CONF "${NGINX_CONF}.bak"

# Update types_hash_max_size and server_names_hash_bucket_size
sudo sed -i '/http {/a \    types_hash_max_size 2048;' $NGINX_CONF
sudo sed -i '/http {/a \    server_names_hash_bucket_size 128;' $NGINX_CONF

# Reload Nginx to apply changes
sudo systemctl reload nginx
