#FROM nginx:1.9
FROM nginx:1.12.1

ENV NPM_CONFIG_LOGLEVEL info

# Copy configs
COPY ./docker/bin /usr/local/bin/app
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker/confd /etc/confd

RUN apt-get update --fix-missing && \
# Install tools
    apt-get install -y \
        apt-utils \
        bzip2 \
        curl \
        git && \
# Install node & npm
    curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get install -y nodejs && \
# Install confd
    curl -L https://github.com/kelseyhightower/confd/releases/download/v0.11.0/confd-0.11.0-linux-amd64 > /usr/local/bin/confd && \
    chmod +x /usr/local/bin/confd

COPY ./ /var/www/application
WORKDIR /var/www/application

# Build
RUN if [ -d "node_modules" ]; then rm -r "node_modules"; fi
RUN npm i && npm run build

RUN chmod +x /usr/local/bin/app/*
CMD /usr/local/bin/app/run.sh
