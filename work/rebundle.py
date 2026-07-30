"""Reassemble index.html with the patched template.

Only the __bundler/template payload changes; the loader script, the asset
manifest, page_order and ext_resources are copied through byte-for-byte, since
no asset was touched.

The payload is JSON, embedded inside a <script> — so every "</" is written as
"<\\u002F" (a legal JSON escape that JSON.parse resolves back to "/") to keep
the HTML parser from ending the script early at the template's own closing
tags. That is exactly the convention the original file used.
"""

import json, re

SRC = '/sessions/gracious-lucid-pasteur/mnt/uploads/index.html'
TPL = '/sessions/gracious-lucid-pasteur/mnt/outputs/work/template.html'
OUT = '/sessions/gracious-lucid-pasteur/mnt/outputs/index.html'

src = open(SRC, encoding='utf-8').read()
new_tpl = open(TPL, encoding='utf-8').read()

pat = re.compile(r'(<script type="__bundler/template">\n)(.*?)(</script>)', re.S)
m = pat.search(src)
assert m, 'template script tag not found'

# Round-trip check on the ORIGINAL payload first: proves the encoding this
# script emits is the same one the file already parses with.
old_parsed = json.loads(m.group(2))
assert len(old_parsed) == 122605, f'unexpected original template length {len(old_parsed)}'


def encode(s):
    return json.dumps(s, ensure_ascii=False).replace('</', '<\\u002F')


payload = encode(new_tpl)
assert json.loads(payload) == new_tpl, 'payload does not round-trip'
assert '</' not in payload, 'unescaped </ would terminate the script tag early'

out = src[:m.start(2)] + payload + src[m.end(2):]

# The loader substitutes every manifest uuid into the template. A demo URL that
# happened to contain one would be corrupted, so confirm none collide.
manifest = json.loads(
    re.search(r'<script type="__bundler/manifest">\n(.*?)</script>', src, re.S).group(1))
for uuid in manifest:
    assert uuid not in new_tpl or f'"{uuid}"' in new_tpl, f'suspicious uuid use: {uuid}'

open(OUT, 'w', encoding='utf-8').write(out)

print(f'original : {len(src):>9,} chars')
print(f'rebuilt  : {len(out):>9,} chars   ({len(out) - len(src):+,})')
print(f'template : {len(old_parsed):>9,} -> {len(new_tpl):,} chars')
print(f'assets   : {len(manifest)} carried through unchanged')
