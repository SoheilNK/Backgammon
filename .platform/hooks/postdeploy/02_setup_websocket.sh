# Define WebSocket configuration
WS_CONFIG="    location /ws {\\n        proxy_pass http://127.0.0.1:8001;\\n        proxy_http_version 1.1;\\n        proxy_set_header Upgrade \$http_upgrade;\\n        proxy_set_header Connection \"upgrade\";\\n        proxy_set_header Host \$host;\\n        proxy_set_header X-Real-IP \$remote_addr;\\n        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;\\n    }"

# Check if WebSocket configuration already exists
if ! sudo grep -q "location /ws" "$NGINX_CONF"; then
    # Insert WebSocket configuration into the specific server block
    sudo sed -i "/ssl_dhparam/a $WS_CONFIG" $NGINX_CONF
fi

# Reload Nginx to apply changes
sudo systemctl reload nginx
