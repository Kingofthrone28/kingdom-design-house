#!/bin/bash

# Production Contact Form Test Script
# Tests the contact form on Railway production server
# Usage: ./test-production.sh [PRODUCTION_URL]

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration - Update with your Railway production URL
PROD_URL="${1:-${RAILWAY_URL:-https://your-contact-server.up.railway.app}}"

if [ "$PROD_URL" == "https://your-contact-server.up.railway.app" ]; then
  echo -e "${RED}❌ Error: Please provide your Railway production URL${NC}"
  echo ""
  echo "Usage:"
  echo "  ./test-production.sh https://your-app.up.railway.app"
  echo ""
  echo "Or set RAILWAY_URL environment variable:"
  echo "  export RAILWAY_URL=https://your-app.up.railway.app"
  echo "  ./test-production.sh"
  exit 1
fi

ENDPOINT="${PROD_URL}/api/contact"
HEALTH_ENDPOINT="${PROD_URL}/api/health"

echo -e "${BLUE}🧪 Production Contact Form Test${NC}"
echo -e "${BLUE}================================${NC}"
echo ""
echo -e "Production URL: ${YELLOW}${PROD_URL}${NC}"
echo ""

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
echo -e "${YELLOW}-------------------${NC}"

HEALTH_RESPONSE=$(curl -X GET "${HEALTH_ENDPOINT}" \
  -H "Accept: application/json" \
  -w "\nHTTP_STATUS:%{http_code}" \
  -s -S)

HTTP_STATUS=$(echo "$HEALTH_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
HEALTH_BODY=$(echo "$HEALTH_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" == "200" ]; then
  echo -e "${GREEN}✅ Health check passed${NC}"
  echo "$HEALTH_BODY" | jq '.' 2>/dev/null || echo "$HEALTH_BODY"
else
  echo -e "${RED}❌ Health check failed (Status: ${HTTP_STATUS})${NC}"
  echo "$HEALTH_BODY"
  exit 1
fi

echo ""
echo ""

# Test 2: Contact Form Submission
echo -e "${YELLOW}Test 2: Contact Form Submission${NC}"
echo -e "${YELLOW}-------------------------------${NC}"

CONTACT_RESPONSE=$(curl -X POST "${ENDPOINT}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Production Test User",
    "email": "production-test@example.com",
    "phone": "+1234567890",
    "company": "Test Company",
    "service": "web-development",
    "message": "This is a production test to verify the contact form is working correctly with the noreply@ email configuration and info@ business email address."
  }' \
  -w "\nHTTP_STATUS:%{http_code}\nTIME_TOTAL:%{time_total}" \
  -s -S)

HTTP_STATUS=$(echo "$CONTACT_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
TIME_TOTAL=$(echo "$CONTACT_RESPONSE" | grep "TIME_TOTAL" | cut -d: -f2)
RESPONSE_BODY=$(echo "$CONTACT_RESPONSE" | sed '/HTTP_STATUS/d' | sed '/TIME_TOTAL/d')

echo "Response:"
echo "$RESPONSE_BODY" | jq '.' 2>/dev/null || echo "$RESPONSE_BODY"
echo ""
echo -e "HTTP Status: ${YELLOW}${HTTP_STATUS}${NC}"
echo -e "Response Time: ${YELLOW}${TIME_TOTAL}s${NC}"

if [ "$HTTP_STATUS" == "200" ]; then
  echo ""
  echo -e "${GREEN}✅ Contact form submission successful!${NC}"
  echo ""
  echo -e "${BLUE}📧 Email Verification:${NC}"
  echo -e "  ✅ Check ${GREEN}info@kingdomdesignhouse.com${NC} (NEO inbox) for business notification"
  echo -e "  ✅ Check ${GREEN}production-test@example.com${NC} for confirmation email"
  echo ""
  echo -e "${BLUE}📋 Email Details:${NC}"
  echo -e "  FROM: ${YELLOW}noreply@kingdomdesignhouse.com${NC}"
  echo -e "  TO (Business): ${YELLOW}info@kingdomdesignhouse.com${NC}"
  echo -e "  TO (Confirmation): ${YELLOW}production-test@example.com${NC}"
  echo -e "  REPLY-TO (Business): ${YELLOW}production-test@example.com${NC} (form sender)"
  echo -e "  REPLY-TO (Confirmation): ${YELLOW}info@kingdomdesignhouse.com${NC}"
else
  echo ""
  echo -e "${RED}❌ Contact form submission failed!${NC}"
  echo ""
  echo -e "${YELLOW}🔍 Troubleshooting:${NC}"
  echo "  1. Check Railway logs for errors"
  echo "  2. Verify environment variables in Railway dashboard"
  echo "  3. Ensure noreply@ is verified in SendGrid"
  echo "  4. Check SendGrid Activity dashboard for errors"
  exit 1
fi

echo ""
echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}✅ Production Test Complete${NC}"


