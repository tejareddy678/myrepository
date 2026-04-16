@echo off
echo Starting Student Nexus v11.0 (Advanced DAL)...
echo.
echo [1/2] Building project with Maven...
call mvn clean install -DskipTests
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build failed! Ensure Maven and Java 17 are installed.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Launching Spring Boot Application...
echo Access it at: http://localhost:8080
echo.
call mvn spring-boot:run
pause
