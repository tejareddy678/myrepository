# Start Demo Script for Task 16: API Gateway and Load Balancing

# 1. Build all services
echo "Building services..."
cd "C:\Users\VIMAL31072005\.gemini\antigravity\scratch\task15_service_registry\discovery-service"
# mvn clean package -DskipTests

cd "C:\Users\VIMAL31072005\.gemini\antigravity\scratch\task15_service_registry\inventory-service"
# mvn clean package -DskipTests

cd "C:\Users\VIMAL31072005\.gemini\antigravity\scratch\task16_api_gateway\api-gateway"
# mvn clean package -DskipTests

echo "Starting services..."

# 2. Start Eureka Server (Port 8761)
# Start-Process java -ArgumentList "-jar target/discovery-service-0.0.1-SNAPSHOT.jar" -WindowStyle Minimized

# 3. Start API Gateway (Port 8080)
# Start-Process java -ArgumentList "-jar target/api-gateway-0.0.1-SNAPSHOT.jar" -WindowStyle Minimized

# 4. Start Inventory Service Instance 1 (Port 8081)
# Start-Process java -ArgumentList "-Dserver.port=8081 -jar target/inventory-service-0.0.1-SNAPSHOT.jar" -WindowStyle Minimized

# 5. Start Inventory Service Instance 2 (Port 8082)
# Start-Process java -ArgumentList "-Dserver.port=8082 -jar target/inventory-service-0.0.1-SNAPSHOT.jar" -WindowStyle Minimized

echo "All services are starting up. Please wait about 30-60 seconds for registration in Eureka."
echo "You can view the Eureka dashboard at: http://localhost:8761"
echo "Test the Gateway Load Balancing at: http://localhost:8080/inventory/info"
