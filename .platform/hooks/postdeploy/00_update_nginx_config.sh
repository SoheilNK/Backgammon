#!/bin/bash

# Define Nginx configuration file path
NGINX_CONF="/etc/nginx/nginx.conf"

# Backup the original configuration file
sudo cp $NGINX_CONF "${NGINX_CONF}.bak"

# Update types_hash_max_size and server_names_hash_bucket_size
sudo sed -i '/http {/a \    types_hash_max_size 2048;' $NGINX_CONF
sudo sed -i '/http {/a \    server_names_hash_bucket_size 128;' $NGINX_CONF

# Define WebSocket configuration
WS_CONFIG="    location /ws {\\n        proxy_pass http://127.0.0.1:8001;\\n        proxy_http_version 1.1;\\n        proxy_set_header Upgrade \$http_upgrade;\\n        proxy_set_header Connection \"upgrade\";\\n        proxy_set_header Host \$host;\\n        proxy_set_header X-Real-IP \$remote_addr;\\n        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;\\n    }"

# Check if WebSocket configuration already exists
if ! sudo grep -q "location /ws" "$NGINX_CONF"; then
    # Insert WebSocket configuration into the specific server block
    sudo sed -i "/ssl_dhparam/a $WS_CONFIG" $NGINX_CONF
fi

# Reload Nginx to apply changes
sudo systemctl reload nginx
