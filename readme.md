# Deployment

## Setting Up a VPS

- We are using Digital Ocean for this one
- Create a droplet with your required specifications

### Access into VPS
```
ssh root@[IP_Address]
```

### Update system
```
sudo apt update
sudo apt upgrade
```

### Create a Non-Root User
```
useradd -m -s /bin/bash username
groups username

# This will add the user to the sudoers group, giving them the ability to run commands with sudo privileges.
usermod -aG sudo username 

# Create password for the created user
sudo passwd username
```

### Now Login with the newly created user
```
ssh username@[IP_Address]
```

### Install Node.Js using NVM
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Install Nodejs using NVM
nvm install --lts
```

### Install git and Github CLI
```
apt install git 
apt install gh

# Login with github
gh auth login
```

### Get your code
```
git clone [repo_name]
```

### Install pm2 to run the application in backgroud
```
npm i -g pm2
pm2 start npm --name "name" -- start
pm2 list
pm2 logs name
pm2 delete all

// To test our backend
curl http://localhost:8000
```

## Getting started with Nginx
```
apt install nginx

# Start and Enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# some common directives
/etc/nginx/sites-available
/etc/nginx/sites-enabled
/var/www/html

# Some other commands
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl reload nginx
```

### Create .conf file
- Navigate to `/etc/nginx/sites-available`
```
# remove default file
rm default
# create a new file api.conf
Use nano as text editor by:
sudo nano api.conf

server {
 listen 80;  # Listen on port 80 for incoming HTTP requests
 server_name localhost;  # Server name or domain name this block will respond to

 location / {
     proxy_pass http://localhost:5000;  # Proxy requests to the backend server running on localhost:8080
     proxy_set_header Host $host;  # Set the Host header to the client's original host
     proxy_set_header X-Real-IP $remote_addr;  # Set the X-Real-IP header to the client's IP address
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # Append client's IP addresses to X-Forwarded-For header
     proxy_set_header X-Forwarded-Proto $scheme;  # Set the X-Forwarded-Proto header to the client's protocol (http or https)
 }
}
``` 
-Add the .conf file `/etc/nginx/sites-enabled`
```
# Remove default file

# Create a symbolic link of the file we created.

ln -s ../sites-available/api.conf
```

### Test and Restart nginx
```
sudo nginx -t
sudo systemctl restart nginx
```

### Configure Rate-Limitting in Nginx
- Edit the file `sudo nano /etc/nginx/nginx.conf`
```
http {
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=2r/s;

    ...
}
```
- Edit the file `sudo nano /etc/nginx/sites-available/api.conf`

```
server {
    ...

    location / {
        limit_req zone=mylimit burst=20 nodelay;
        try_files $uri $uri/ =404;
    }

    ...
}
```
- Test and Reload Nginx
```
sudo nginx -t
sudo systemctl reload nginx
```


### Configure the domain
- Add the two A records
- 1 with @
- 1 with www. 
- Create a file at `/etc/nginx/sites-available` by the name of your domain i.e `abc.com.conf`

```
cp api.conf abc.com.conf

nano abc.com.conf

server {
        listen 80;
        server_name <domain> www.<domain>;
        
        location / {
                try_files $uri $uri/ /index.html;
        }
}
```

- Navigate to `/etc/nginx/sites-enabled`
```
ln -s ../sites-available/abc.com.conf

systemctl restart nginx
```

- Domain will be live after all these steps

### Add SSL Ceritificate
- Install following packages
```
sudo apt install certbot python3-certbot-nginx


sudo certbot --nginx -d abc.com -d www.abc.com
```

- After this step you will have a SSL certificate for your Deployment

### To Deploy React application
- Follow the same steps as the api
- Build your application
- Server your application locally 
- `npm i -g serve`
- `pm2 start serve --name "your-app-name" -- -s build -l 3000`

### .conf file for a NextJs application

```
server {
 listen 80; 
 server_name [domain] www.[domain];  

 location / {
    limit_req zone=mylimit burst=20 nodelay;
    try_files $uri $uri/ /index.html =404;
    proxy_pass http://64.227.129.139:3000; 
    proxy_set_header Host $host; 
    proxy_set_header X-Real-IP $remote_addr;  
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
    proxy_set_header X-Forwarded-Proto $scheme;  
 }
}
```

### Useful Links:
- https://thapatechnical.shop/blogs/host-a-mern-stack-app-on-a-vps
- https://docs.chaicode.com/server-setup/