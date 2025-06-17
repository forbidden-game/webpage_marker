#!/usr/bin/env python3
# Simple script to create placeholder icons
# Since we don't have PIL installed, let's create empty files
# You'll need to replace these with actual icons

import os

# Create empty placeholder files
for size in [16, 48, 128]:
    filename = f'icon{size}.png'
    with open(filename, 'wb') as f:
        # Write minimal PNG header (1x1 transparent pixel)
        f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\x0bIDATx\x9cc\xf8\x00\x00\x00\x01\x00\x01UU\x86\x18\x00\x00\x00\x00IEND\xaeB`\x82')
    print(f'Created placeholder {filename}')