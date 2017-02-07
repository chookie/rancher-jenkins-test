############################################################
# Dockerfile to build an Nginx static server
# Based on docker-nginx
# See https://blog.docker.com/2015/04/tips-for-deploying-nginx-official-image-with-docker/
#
# Build: docker build --tag cardano/dc-walking-skeleton .
# -t Allocate a pseudo-tty (not interactive yet)
#
# Run:
# stripped-nginx: CONTAINER_ID=$(docker run --name dcws1 -P -d cardano/dc-walking-skeleton)
# nginx : docker run --name dcws1 -P -d cardano/dc-walking-skeleton
# -P option tells Docker to map those ports to ports on the Docker host that are randomly selected from the range between 49153 and 65535. We do this because if we create multiple NGINX containers on the same Docker host, we create a conflict on ports 80 and 443
# -d detached
#
  # Shell: docker run -i -t --volumes-from dcws1 --name dcws1files debian /bin/bash
############################################################
#FROM nginx
FROM cardano/stripped-nginx

ADD dist /usr/share/nginx/html

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Allow editing of the files in the container.
# Probably want to turn this off in prod but can do that when create container
VOLUME /usr/share/nginx/html
# config
VOLUME /etc/nginx
# logs
VOLUME /var/log/nginx/log

CMD /usr/sbin/nginx
