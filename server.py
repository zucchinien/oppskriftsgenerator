import http.server
import socketserver
import socket

def get_local_ip():
    try:
        # Get local IP address
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    local_ip = get_local_ip()
    print(f"Server running at:")
    print(f"Local: http://localhost:{PORT}")
    print(f"Network: http://{local_ip}:{PORT}")
    print("\nTo access from your iPhone:")
    print(f"1. Make sure your iPhone is on the same WiFi network")
    print(f"2. Open Safari and enter: http://{local_ip}:{PORT}")
    print("\nPress Ctrl+C to stop the server")
    httpd.serve_forever() 