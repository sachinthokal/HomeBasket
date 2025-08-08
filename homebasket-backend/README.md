# Homebasket Backend

## How to Run

1. Create MySQL DB:
```sql
CREATE DATABASE homebasket;
```

2. Update `src/main/resources/application.properties` with your MySQL username/password.

3. Run the backend:
```bash
mvn spring-boot:run
```

4. API endpoints:
- GET `http://localhost:8080/api/products`
- POST `http://localhost:8080/api/products`
