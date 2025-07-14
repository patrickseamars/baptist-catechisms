#!/bin/bash

# Baptist Catechism Web Application Startup Script
echo "Starting Baptist Catechism Web Application..."
echo "Opening in your default browser..."
echo ""
echo "When you're done, press Ctrl+C to stop the server"
echo ""

# Open the browser
open http://localhost:8000

# Start the Python web server
python3 -m http.server 8000
