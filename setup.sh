#!/bin/bash

echo "🚀 Setting up Kingdom Design House project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install RAG API dependencies
echo "📦 Installing RAG API dependencies..."
cd rag-api
npm install
cd ..

# Install Netlify functions dependencies
echo "📦 Installing Netlify functions dependencies..."
cd netlify/functions
npm install
cd ../..

echo "✅ All dependencies installed successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Create a .env.local file in the frontend directory with your API keys"
echo "2. Set up your Pinecone index with: cd rag-api && npm run populate"
echo "3. Start the development server with: cd frontend && npm run dev"
echo ""
echo "📚 See README.md for detailed setup instructions"