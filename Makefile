.PHONY: init-db migrate seed dev build lint clean

# MySQL connection details
MYSQL_USER = root
MYSQL_HOST = localhost
MYSQL_PORT = 3306

# Database name to create
DB_NAME = canvas_app

# Apply Prisma migrations
migrate:
	npx prisma migrate deploy

# Run Prisma seed script
seed:
	npm run seed
# Initialize the MySQL database by running init.sql
init-db:
	mysql -u $(MYSQL_USER) -h $(MYSQL_HOST) -P $(MYSQL_PORT) < ./init.sql
	npx prisma migrate deploy
	npm run seed



# Apply migrations then seed
migrate-seed: migrate seed

# Start Next.js dev server
dev:
	npm run dev

# Build Next.js app
build:
	npm run build

# Run linter
lint:
	npm run lint

# Clean build artifacts
clean:
	rm -rf node_modules .next
