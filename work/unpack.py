import re, json, gzip, base64, os

src = open('/sessions/gracious-lucid-pasteur/mnt/uploads/index.html', encoding='utf-8').read()

def grab(kind):
    m = re.search(r'<script type="__bundler/%s">(.*?)</script>' % kind, src, re.S)
    return m.group(1).strip() if m else None

for k in ['manifest','template','page_order','ext_resources']:
    v = grab(k)
    print(k, '->', 'None' if v is None else f'{len(v)} chars')

man = json.loads(grab('manifest'))
tpl = json.loads(grab('template'))
po = grab('page_order')
print('page_order:', po)
print('template len:', len(tpl))
print('manifest entries:', len(man))
for u,e in man.items():
    d = base64.b64decode(e['data'])
    if e.get('compressed'):
        d = gzip.decompress(d)
    print(' ', u, e['mime'], len(d))
    open('asset_'+u[:8]+'.bin','wb').write(d)
open('template.html','w',encoding='utf-8').write(tpl)
