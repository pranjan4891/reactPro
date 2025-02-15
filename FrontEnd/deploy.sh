#!/bin/bash

set -e  # Exit immediately if any command fails

# Define the variables for your frontend project and server path
FRONTEND_DIR="/home/ubuntu/thc_backoffice_new"  # Path to your frontend project
FRONTEND_BRANCH="thc_backoffice"               # Set your frontend branch
BUILD_DIR="$FRONTEND_DIR/dist"                 # Vite's default build directory
SERVER_DIR="/var/www/thc_backoffice/dist"      # Directory where the build files should be moved

# Function to deploy frontend
deploy_frontend() {
  echo "🚀 Deploying frontend..."

  # Navigate to the frontend project directory
  cd $FRONTEND_DIR || { echo "❌ Error: Frontend directory not found!"; exit 1; }

  # Pull the latest changes from the repository
  echo "📦 Pulling latest frontend changes from '$FRONTEND_BRANCH'..."
  git pull origin $FRONTEND_BRANCH

  # Install frontend dependencies using yarn
  echo "📦 Installing frontend dependencies..."
  yarn install --frozen-lockfile

  # Build the frontend for production using Vite
  echo "⚙️  Building frontend..."
  yarn build

  # Remove the old build directory if it exists
  if [ -d "$SERVER_DIR" ]; then
    echo "🗑️  Removing old build files from $SERVER_DIR..."
    sudo rm -rf $SERVER_DIR
  fi

  # Move the new build to the server directory
  echo "🚚 Moving new build files to $SERVER_DIR..."
  sudo mv $BUILD_DIR $SERVER_DIR

  # Set proper ownership and permissions
  echo "🔧 Setting permissions..."
  sudo chown -R www-data:www-data /var/www/thc_backoffice
  sudo chmod -R 755 /var/www/thc_backoffice

  echo "✅ Frontend deployment completed."
}

# Function to restart the Nginx server
restart_server() {
  echo "🔄 Restarting Nginx server..."
  sudo systemctl restart nginx
  echo "✅ Nginx server restarted."
}

# Main function to deploy frontend and restart server
deploy() {
  deploy_frontend
  restart_server
  echo "🎉 Deployment process completed successfully!"
}

# Run the deployment script
deploy
