#!/bin/bash

# Quick Contact Form Test
# Simple test to verify the contact form works with new email configuration

SERVER_URL="${SERVER_URL:-http://localhost:8081}"

echo "🧪 Quick Contact Form Test"
echo "Server: ${SERVER_URL}"
echo ""

curl -X POST "${SERVER_URL}/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "web-development",
    "message": "Testing contact form with info@ email configuration."
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  | jq '.' 2>/dev/null || cat

echo ""
echo "✅ Check info@kingdomdesignhouse.com for email"
echo "✅ Verify reply-to header points to test@example.com"

