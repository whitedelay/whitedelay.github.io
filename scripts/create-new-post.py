import os
import sys
from datetime import datetime, timezone
from pathlib import Path

if len(sys.argv) < 2:
    print("post name is needed")
    sys.exit()

postname = sys.argv[1].strip()

if len(sys.argv) > 2:
    print("Too many arguments")
    sys.exit()


root_dir = Path(__file__).parents[1]  # two levels up
post_path = f'{root_dir}/content/posts/{postname}.md'

if os.path.exists(post_path):
    print("Post already exists")
    sys.exit()

with open(post_path, 'w') as f:
    f.write("---\n")
    f.write(f"title: {postname}\n")
    f.write("description: \n")
    f.write(f"date: {datetime.now(timezone.utc)}\n")
    f.write("tags: []\n")
    f.write("---\n")
