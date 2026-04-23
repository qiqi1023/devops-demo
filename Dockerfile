# ── Stage 1: Use official lightweight Node image ──────────────────
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first (Docker layer cache optimisation)
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the default command to run the app
CMD ["node", "src/app.js"]