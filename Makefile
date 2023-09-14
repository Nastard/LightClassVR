build:
	docker build -t lightclassvr .

run:
	docker run -p 443:4433 lightclassvr

clear:
	docker system prune -a

stop:
	docker stop $$(docker ps -q --filter ancestor=lightclassvr)

all:
	make build
	make run

cert:
	openssl req \
		-x509 \
		-nodes \
		-days 365 \
		-newkey rsa:2048 \
		-subj "/C=ES/ST=Granada/L=Granada/O=LightClassVR/OU=IT/CN=test.lightclassvr.es" \
		-keyout ./server/certs/cert2.key \
		-out ./server/certs/cert2.crt
