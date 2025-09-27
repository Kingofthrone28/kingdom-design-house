#!/bin/bash

# Kingdom Design House - Setup Script
# This script helps set up the development environment

set -e

echo "🚀 Setting up Kingdom Design House development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) detected"

# Install dependencies for each service
print_status "Installing frontend dependencies..."
cd frontend
if [ ! -f "package.json" ]; then
    print_error "package.json not found in frontend directory"
    exit 1
fi
npm install
print_success "Frontend dependencies installed"

print_status "Installing RAG API dependencies..."
cd ../rag-api
if [ ! -f "package.json" ]; then
    print_error "package.json not found in rag-api directory"
    exit 1
fi
npm install
print_success "RAG API dependencies installed"

print_status "Installing Netlify Functions dependencies..."
cd ../netlify/functions
if [ ! -f "package.json" ]; then
    print_error "package.json not found in netlify/functions directory"
    exit 1
fi
npm install
print_success "Netlify Functions dependencies installed"

# Create environment files
print_status "Setting up environment files..."

# Frontend
cd ../../frontend
if [ ! -f ".env.local" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env.local
        print_success "Created frontend/.env.local from template"
    else
        print_warning "env.example not found in frontend directory"
    fi
else
    print_warning "frontend/.env.local already exists"
fi

# RAG API
cd ../rag-api
if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env
        print_success "Created rag-api/.env from template"
    else
        print_warning "env.example not found in rag-api directory"
    fi
else
    print_warning "rag-api/.env already exists"
fi

# Netlify Functions
cd ../netlify/functions
if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env
        print_success "Created netlify/functions/.env from template"
    else
        print_warning "env.example not found in netlify/functions directory"
    fi
else
    print_warning "netlify/functions/.env already exists"
fi

# Return to project root
cd ../..

print_success "Environment files created"

# Display next steps
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Fill in your API keys in the .env files:"
echo "   - frontend/.env.local"
echo "   - rag-api/.env"
echo "   - netlify/functions/.env"
echo ""
echo "2. Get your API keys from:"
echo "   - Pinecone: https://app.pinecone.io/"
echo "   - OpenAI: https://platform.openai.com/api-keys"
echo "   - HubSpot: https://app.hubspot.com/private-apps"
echo "   - Netlify: https://app.netlify.com/user/applications"
echo ""
echo "3. Start the development servers:"
echo "   # Terminal 1 - RAG API"
echo "   cd rag-api && npm start"
echo ""
echo "   # Terminal 2 - Frontend"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Populate the Pinecone index:"
echo "   cd rag-api && node scripts/populate-index.js"
echo ""
echo "📖 For detailed setup instructions, see SETUP_INSTRUCTIONS.md"
echo ""
print_success "Happy coding! 🚀"