build:
	git pull && docker-compose up -d --build
restart:
	git pull && docker-compose restart
logs:
	docker-compose logs --tail 20 -f