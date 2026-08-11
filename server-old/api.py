from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from views import home, show_keys
import json
import os

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(home.home_page_template)

        if self.path == "/signup":
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            keys_fragment = show_keys.show_keys()

            self.wfile.write(keys_fragment)

server = ThreadingHTTPServer(("0.0.0.0", 8000), MyHandler)
print("Listening on port 8000")
server.serve_forever()
