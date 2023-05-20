#!/bin/bash

# Define variables
GIT_DIR="." # Replace with the path to your Git directory
CLIENT_APP_DIR="./ClientApp" # Replace with the path to your client app directory
DOTNET_PROJECT_FILE="./MyProject.csproj" # Replace with the path to your .NET project file

# Define functions
function update_database {
  dotnet ef database update
}

function install_client_dependencies {
  cd $CLIENT_APP_DIR
  npm install
  cd $GIT_DIR
}

# Script execution begins here
cd $GIT_DIR

# Perform Git pull
git pull

# Update database
update_database

# Install client dependencies
install_client_dependencies

# Change to the parent directory of the current directory
cd ..

# Build and run .NET project
dotnet build $DOTNET_PROJECT_FILE
dotnet run $DOTNET_PROJECT_FILE