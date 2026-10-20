"""
Pretend mail server for testing the forms on your own computer.
Every email the forms send is saved as an .eml file (open it in Outlook or Mail)
instead of being sent. Started by test-forms.ps1.
"""
import email
import itertools
import os
import re
import socket
import sys
from email import policy

out_dir = sys.argv[1]
os.makedirs(out_dir, exist_ok=True)

server = socket.socket()
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(('127.0.0.1', 2525))
server.listen(5)
print(f'Test emails will be saved in {out_dir}', flush=True)

for number in itertools.count(1):
    conn, _ = server.accept()
    reader = conn.makefile('rb')

    def reply(text):
        conn.sendall(text.encode() + b'\r\n')

    reply('220 test mail catcher')
    lines = None
    while True:
        line = reader.readline()
        if not line:
            break
        if lines is not None:
            if line in (b'.\r\n', b'.\n'):
                raw = b''.join(l[1:] if l.startswith(b'..') else l for l in lines)
                msg = email.message_from_bytes(raw, policy=policy.default)
                subject = str(msg['Subject'] or 'no subject')
                name = re.sub(r'[^A-Za-z0-9 _-]+', '', subject)[:60].strip() or 'email'
                path = os.path.join(out_dir, f'{number:02d} {name}.eml')
                with open(path, 'wb') as f:
                    f.write(raw)
                files = [p.get_filename() for p in msg.walk() if p.get_filename()]
                print(f'\nEmail {number} to {msg["To"]}: {subject}', flush=True)
                if files:
                    print('  attached: ' + ', '.join(files), flush=True)
                print(f'  saved as {path}', flush=True)
                lines = None
                reply('250 saved')
                continue
            lines.append(line)
            continue
        command = line.strip().upper()
        if command.startswith(b'DATA'):
            lines = []
            reply('354 go ahead')
        elif command.startswith(b'QUIT'):
            reply('221 bye')
            break
        else:
            reply('250 ok')
    conn.close()
