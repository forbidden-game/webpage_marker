#!/usr/bin/env python3
"""
Create beautiful icons for the Academic Webpage Marker extension
Generates 16x16, 48x48, and 128x128 PNG icons
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("PIL not available, creating simple SVG icons instead")

import os

def create_svg_icon(size, filename):
    """Create an SVG icon that can be converted to PNG"""
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="{size//2}" cy="{size//2}" r="{size//2 - 2}" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
  
  <!-- Highlighter body -->
  <rect x="{size//4}" y="{size//3}" width="{size//2}" height="{size//3}" fill="#4CAF50" rx="2"/>
  
  <!-- Highlighter tip -->
  <rect x="{size//4 + 4}" y="{size//2 + 2}" width="{size//2 - 8}" height="{size//6}" fill="#81C784" rx="1"/>
  
  <!-- Text lines being highlighted -->
  <rect x="{size//8}" y="{size//1.5}" width="{size - size//4}" height="2" fill="#666" opacity="0.6"/>
  <rect x="{size//8}" y="{size//1.5 + 4}" width="{size - size//3}" height="2" fill="#FFE135" opacity="0.9"/>
  <rect x="{size//8}" y="{size//1.5 + 8}" width="{size - size//2.5}" height="2" fill="#666" opacity="0.6"/>
</svg>'''
    
    with open(f'icons/{filename}', 'w') as f:
        f.write(svg_content)
    print(f"Created SVG icon: {filename}")

def create_pil_icon(size, filename):
    """Create a PNG icon using PIL"""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors
    bg_color = (255, 215, 0, 255)  # Gold
    highlighter_color = (76, 175, 80, 255)  # Green
    tip_color = (129, 199, 132, 255)  # Light green
    text_color = (102, 102, 102, 180)  # Gray
    highlight_color = (255, 225, 53, 230)  # Yellow highlight
    
    # Background circle
    margin = 2
    draw.ellipse([margin, margin, size-margin, size-margin], fill=bg_color, outline=(255, 165, 0, 255), width=2)
    
    # Highlighter body
    h_width = size // 2
    h_height = size // 3
    h_x = size // 4
    h_y = size // 3
    draw.rounded_rectangle([h_x, h_y, h_x + h_width, h_y + h_height], radius=2, fill=highlighter_color)
    
    # Highlighter tip
    tip_margin = 4
    tip_height = size // 6
    tip_y = h_y + h_height // 3
    draw.rounded_rectangle([h_x + tip_margin, tip_y, h_x + h_width - tip_margin, tip_y + tip_height], 
                          radius=1, fill=tip_color)
    
    # Text lines
    line_height = 2
    start_y = int(size * 0.67)
    line_spacing = 4
    
    # Line 1 (normal text)
    draw.rectangle([size//8, start_y, size - size//4, start_y + line_height], fill=text_color)
    
    # Line 2 (highlighted text)
    draw.rectangle([size//8, start_y + line_spacing, size - size//3, start_y + line_spacing + line_height], fill=highlight_color)
    
    # Line 3 (normal text)
    draw.rectangle([size//8, start_y + line_spacing*2, size - int(size//2.5), start_y + line_spacing*2 + line_height], fill=text_color)
    
    # Save the image
    img.save(f'icons/{filename}', 'PNG')
    print(f"Created PNG icon: {filename}")

def main():
    # Create icons directory if it doesn't exist
    if not os.path.exists('icons'):
        os.makedirs('icons')
    
    # Generate icons for all required sizes
    sizes = [16, 48, 128]
    
    if PIL_AVAILABLE:
        print("Using PIL to create high-quality PNG icons...")
        for size in sizes:
            create_pil_icon(size, f'icon{size}.png')
    else:
        print("PIL not available. Creating SVG icons (you'll need to convert to PNG manually)...")
        for size in sizes:
            create_svg_icon(size, f'icon{size}.svg')
        
        print("\nTo convert SVG to PNG, you can:")
        print("1. Use an online converter like https://convertio.co/svg-png/")
        print("2. Install ImageMagick: brew install imagemagick")
        print("   Then run: convert icon16.svg icon16.png")
        print("3. Use any graphics editor like GIMP, Figma, or Sketch")

if __name__ == "__main__":
    main()