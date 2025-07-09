#!/usr/bin/env python3
"""
Simple development server for the portfolio website
Serves static files and provides live reload capability
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 3000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Add security headers
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-XSS-Protection', '1; mode=block')
        super().end_headers()

    def do_GET(self):
        # Serve index.html for SPA routing
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

def main():
    print(f"🚀 Starting development server...")
    print(f"📁 Serving directory: {DIRECTORY}")
    print(f"🌐 Server running at: http://localhost:{PORT}")
    print(f"📱 Also accessible at: http://127.0.0.1:{PORT}")
    print("Press Ctrl+C to stop the server")
    
    # Start server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        try:
            # Open browser automatically
            webbrowser.open(f'http://localhost:{PORT}')
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped. Goodbye!")

if __name__ == "__main__":
    main()