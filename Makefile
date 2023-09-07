build:
	docker build -t tfm .

run:
	docker run -p 8080:80 -p 4433:4433 tfm

clear:
	docker system prune -a

all:
	make build
	make run
