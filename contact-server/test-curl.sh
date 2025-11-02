#!/bin/bash

# Contact Form Server - cURL Test Script
# Tests the contact form API endpoint locally
# Make sure the server is running: cd contact-server && npm run dev

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SERVER_URL="${SERVER_URL:-http://localhost:8081}"
ENDPOINT="${SERVER_URL}/api/contact"

echo -e "${BLUE}🧪 Contact Form Server - cURL Test Script${NC}"
echo -e "${BLUE}===========================================${NC}"
echo ""

# Test 1: Full contact form submission
echo -e "${YELLOW}Test 1: Full Contact Form Submission${NC}"
echo -e "${YELLOW}-------------------------------------${NC}"

curl -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "phone": "+1234567890",
    "company": "Test Company",
    "service": "web-development",
    "message": "This is a test message to verify the contact form is working correctly with the new info@ email address. Please confirm receipt."
  }' \
  -w "\n\nStatus Code: %{http_code}\nTotal Time: %{time_total}s\n" \
  -s -S

echo ""
echo ""

# Test 2: Minimal contact form (required fields only)
echo -e "${YELLOW}Test 2: Minimal Contact Form (Required Fields Only)${NC}"
echo -e "${YELLOW}----------------------------------------------------${NC}"

curl -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "service": "ai-solutions",
    "message": "I am interested in AI solutions for my business."
  }' \
  -w "\n\nStatus Code: %{http_code}\nTotal Time: %{time_total}s\n" \
  -s -S

echo ""
echo ""

# Test 3: Health check endpoint
echo -e "${YELLOW}Test 3: Health Check${NC}"
echo -e "${YELLOW}-------------------${NC}"

curl -X GET "${SERVER_URL}/api/health" \
  -H "Accept: application/json" \
  -w "\n\nStatus Code: %{http_code}\nTotal Time: %{time_total}s\n" \
  -s -S

echo ""
echo ""

# Test 4: Test with reCAPTCHA token (if available)
if [ -n "$RECAPTCHA_TOKEN" ]; then
  echo -e "${YELLOW}Test 4: With reCAPTCHA Token${NC}"
  echo -e "${YELLOW}----------------------------${NC}"
  
  curl -X POST "${ENDPOINT}" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "{
      \"name\": \"ReCAPTCHA Test User\",
      \"email\": \"recaptcha@example.com\",
      \"service\": \"web-development\",
      \"message\": \"Testing with reCAPTCHA token.\",
      \"recaptchaToken\": \"${RECAPTCHA_TOKEN}\"
    }" \
    -w "\n\nStatus Code: %{http_code}\nTotal Time: %{time_total}s\n" \
    -s -S
  
  echo ""
  echo ""
fi

# Summary
echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}📋 Test Summary${NC}"
echo ""
echo -e "✅ Check your email inbox: ${GREEN}info@kingdomdesignhouse.com${NC}"
echo -e "✅ Verify SendGrid configuration:"
echo -e "   - From: ${GREEN}noreply@kingdomdesignhouse.com${NC} (or SENDGRID_FROM_EMAIL)"
echo -e "   - To Business: ${GREEN}info@kingdomdesignhouse.com${NC}"
echo -e "   - Reply-To: Form sender's email"
echo ""
echo -e "${YELLOW}Note: Make sure the server is running at ${SERVER_URL}${NC}"
echo -e "${YELLOW}Start server with: cd contact-server && npm run dev${NC}"

