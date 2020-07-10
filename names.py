from os import walk

f = []
for (dirpath, dirnames, filenames) in walk('./'):
    f.extend(filenames)
f = [f'    <div class="tile" data-scale="2.4" data-image="https://rosemary-network.s3.filebase.com/solarpunk-named/{filename}"></div>\n' for filename in f if filename not in ['names.py', 'html.names']

with open('html.names', 'w+') as file:
    file.writelines(f)
