from PIL import Image, ImageDraw, ImageFont
import io
import base64

# Create 1200x630 image with Launch in 7 branding
img = Image.new('RGB', (1200, 630), color='#0B1A2D')
draw = ImageDraw.Draw(img)

# Try to use a simple font
try:
    title_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 72)
    subtitle_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 36)
    small_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)
except:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    small_font = ImageFont.load_default()

# Add gradient background effect by drawing rectangles
for i in range(630):
    # Create a blue gradient effect
    blue_intensity = int(27 + (233-27) * (i/630))
    color = (11, 26, blue_intensity)
    draw.rectangle([(0, i), (1200, i+1)], fill=color)

# Add brand elements
# Logo background
draw.rectangle([(50, 50), (110, 110)], fill='#0EA5E9')
draw.text((80, 75), 'L7', fill='white', font=small_font, anchor='mm')

# Main title
draw.text((600, 280), 'Launch in 7', fill='white', font=title_font, anchor='mm')
draw.text((600, 340), 'Your Website, Live in 7 Days', fill='#E5E7EB', font=subtitle_font, anchor='mm')
draw.text((600, 400), 'Professional Website Development', fill='#D1D5DB', font=small_font, anchor='mm')
draw.text((600, 440), '7-Day Turnaround Guarantee', fill='#D1D5DB', font=small_font, anchor='mm')

# Save as JPEG
img.save('public/og-image.jpg', 'JPEG', quality=95)
print("Created og-image.jpg with Launch in 7 branding")
