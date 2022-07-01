#!/usr/bin/env python3

import os
import sys

os.system('cls' if os.name == 'nt' else 'clear')
if len(sys.argv) != 2:
    print("Usage: ./test.py <integer>")
    sys.exit(1)

lvl = int(sys.argv[-1], 10)
if lvl < 1 or lvl > 20:
    print("Invalid level")
    sys.exit(1)
    
hp = (lvl + 1) * (lvl + 2)
if lvl >= 12 and lvl <= 20:
    hp += 14

print(f"Health: {hp}")
