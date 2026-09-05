"""Render the actual downloadable PDF; preserve source files unchanged."""
from pathlib import Path
import fitz

root = Path(__file__).resolve().parents[1]
doc = fitz.open(root / 'public/downloads/auditweb-website-audit-checklist.pdf')
out = root / 'public/images/audit-checklist-preview.png'
page = doc[1]  # Technical SEO checklist, not an invented mockup.
pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
pix.save(out)
print(f'{out.name}: {pix.width}x{pix.height}, {out.stat().st_size} bytes')
