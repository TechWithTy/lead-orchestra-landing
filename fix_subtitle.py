#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

files = [
    'src/components/ui/pixelated-voice-clone-card.tsx',
    'src/components/ui/pixelated-voice-overlay.tsx'
]

new_text = "Lead Orchestra's AI models your best customers to find lookalike leads across the web. Clone your audience once, generate leads forever."

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match DealScale with any apostrophe type followed by "s neural voice stack "
    content = re.sub(
        r"DealScale['']s neural voice stack ",
        new_text,
        content
    )
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {file}")
