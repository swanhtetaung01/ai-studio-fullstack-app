# -------- Build Stage --------
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy full project
COPY . .

# Build
RUN mvn clean package -DskipTests


# -------- Run Stage --------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Security: non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy jar
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run with memory limits (important for Render free tier)
ENTRYPOINT ["java", "-Xms128m", "-Xmx512m", "-jar", "app.jar"]