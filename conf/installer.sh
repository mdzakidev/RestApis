#!/bin/bash

## Check if curl is installed
if ! [ -x "$(command -v curl)" ]; then
    echo "* curl is required for this script to work."
    echo "* Install using apt (Debian and derivatives) or yum/dnf (CentOS)"
    exit 1
fi

## Coloring
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

## Check if the script is running on a non-Windows system
if [[ "$(uname -s)" == "MINGW64_NT"* || "$(uname -s)" == "MSYS_NT"* || "$(uname -s)" == "CYGWIN_NT"* ]]; then
  echo -e "${RED}This script cannot be run on Windows systems.${NC}"
  exit 1
fi

## Start the installation
read -p "Are you sure you want to continue? (Y/N) " -n 1 -r user_choice
echo  # New line for better readability

if [[ ! "$user_choice" =~ ^[Yy]$ ]]; then
  echo -e "${RED}Operation cancelled.${NC}"
  exit 0
fi

## Checking Information System (OS)
OS_NAME=$(uname -s)
KERNEL_VERSION=$(uname -r)
HOSTNAME=$(uname -n)
ARCHITECTURE=$(uname -m)
CPU_COUNT=$(nproc)
TOTAL_MEM=$(grep MemTotal /proc/meminfo | awk '{print $2/1024 " MB"}')
DISK_SPACE=$(df -h / | awk 'NR==2 {print $4}')

## Displaying the System Information
echo -e "${BLUE}Informasi Sistem Operasi:${NC}"
echo -e "=========================="
echo -e "${YELLOW}Nama OS         :${NC} ${GREEN}$OS_NAME${NC}"
echo -e "${YELLOW}Versi Kernel    :${NC} ${GREEN}$KERNEL_VERSION${NC}"
echo -e "${YELLOW}Hostname        :${NC} ${GREEN}$HOSTNAME${NC}"
echo -e "${YELLOW}Arsitektur      :${NC} ${GREEN}$ARCHITECTURE${NC}"
echo -e "${YELLOW}Jumlah CPU      :${NC} ${GREEN}$CPU_COUNT${NC}"
echo -e "${YELLOW}Total Memori (RAM):${NC} ${GREEN}$TOTAL_MEM${NC}"
echo -e "${YELLOW}Ruang Disk Tersedia:${NC} ${GREEN}$DISK_SPACE${NC}"
echo -e "${BLUE}==========================${NC}"
sleep 5
clear

## Update System
echo -e "${BLUE}Updating and Upgrading System:${NC}"
sudo apt-get update
sudo apt-get upgrade -y

## Install Dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
sudo apt install -y nginx
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install --lts
npm install -g pm2
sleep 3
echo -e "${BLUE}Dependencies installed.${NC}"
clear

## Start Nginx
echo -e "${BLUE}Configuring Nginx...${NC}"
NGINX_CONF="/etc/nginx/sites-available/zaydenapis.conf"
cat <<EOL | sudo tee $NGINX_CONF
server {
    listen 80;
    server_name $domain;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-XSS-Protection          "1; mode=block" always;
    add_header X-Frame-Options DENY always;
}
EOL

sudo ln -s $NGINX_CONF /etc/nginx/sites-enabled/
sudo systemctl restart nginx
echo -e "${BLUE}Nginx configured and restarted.${NC}"

cd ~
cd var/www
mkdir zaydenapis
cd zaydenapis

## Ask to Reboot
read -p "Restart your computer to complete the installation. Press enter to continue. (Y/n) " -n 1 -r user_choice
echo  # New line for better readability

if [[ "$user_choice" =~ ^[Yy]$ ]]; then
  echo -e "${GREEN}Rebooting system...${NC}"
  sudo reboot
elif [[ "$user_choice" =~ ^[Nn]$ ]]; then
  echo -e "${RED}System will not be rebooted.${NC}"
else
  echo -e "${RED}Invalid choice. Please enter Y or N.${NC}"
fi
