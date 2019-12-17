conf_path = nginx.conf
target_conf_path = /etc/nginx/nginx.conf

all: stop build run

run-docker:
	docker run -d --rm \
	-v "$(PWD)/$(conf_path):$(target_conf_path)" \
	--name nginx-proxy-pass \
	--net host \
	nginx:1.17-alpine

run: run-docker

stop:
	docker stop nginx-proxy-pass || exit 0

