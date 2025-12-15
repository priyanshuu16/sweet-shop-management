#!/bin/bash

# Base URL
URL="http://localhost:3000"

# Colors
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Starting Verification of Search Endpoint...${NC}"

# 1. Login/Register to get Token
echo "Getting User Token..."
# Try login first
USER_TOKEN=$(curl -s -X POST $URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com", "password":"password123"}' | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$USER_TOKEN" ] || [ "$USER_TOKEN" == "" ]; then
  echo "Login failed or user doesn't exist. Registering..."
  USER_TOKEN=$(curl -s -X POST $URL/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"testuser@example.com", "password":"password123"}' | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
fi

echo "Token: $USER_TOKEN"

if [ -z "$USER_TOKEN" ]; then
  echo "Failed to get token. Ensure server is running and DB is connected."
  exit 1
fi

# 2. Search by Name
echo -e "\n${GREEN}Test 1: Search by Name (e.g., 'Gulab')${NC}"
curl -s -X GET "$URL/api/sweets/search?name=Gulab" \
  -H "Authorization: Bearer $USER_TOKEN" | python3 -m json.tool

# 3. Search by Category
echo -e "\n${GREEN}Test 2: Search by Category (e.g., 'Indian')${NC}"
curl -s -X GET "$URL/api/sweets/search?category=Indian" \
  -H "Authorization: Bearer $USER_TOKEN" | python3 -m json.tool

# 4. Search by Price Range
echo -e "\n${GREEN}Test 3: Search by Price (min=5, max=50)${NC}"
curl -s -X GET "$URL/api/sweets/search?minPrice=5&maxPrice=50" \
  -H "Authorization: Bearer $USER_TOKEN" | python3 -m json.tool

echo -e "\n${GREEN}Verification Complete.${NC}"
