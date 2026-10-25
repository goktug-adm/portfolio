# =====================================================================
#  regen-index.ps1
#  Walks figures/, images/, custom/ for every project slug and rewrites
#  image-index.js so the picker and detail pages can see your latest
#  files.
#
#  Run after you drop new images into custom/<slug>/ — for example:
#     pwsh ./regen-index.ps1
#
#  No arguments. Picks slugs from existing folders.
# =====================================================================

$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

$slugs = New-Object System.Collections.Generic.HashSet[string]
foreach ($base in @("figures","images","custom")) {
  $p = Join-Path $root $base
  if (Test-Path $p) {
    Get-ChildItem $p -Directory | ForEach-Object { [void]$slugs.Add($_.Name) }
  }
}

$out = @()
foreach ($slug in ($slugs | Sort-Object)) {
  $figs = @()
  $pages = @()
  $custom = @()

  $fdir = Join-Path $root "figures\$slug"
  if (Test-Path $fdir) {
    $figs = Get-ChildItem $fdir -File -Include *.jpg,*.jpeg,*.png,*.webp -ErrorAction SilentlyContinue |
            Sort-Object Name | ForEach-Object { "figures/$slug/$($_.Name)" }
  }

  $pdir = Join-Path $root "images\$slug"
  if (Test-Path $pdir) {
    $pages = Get-ChildItem $pdir -File -Filter "page-*.jpg" -ErrorAction SilentlyContinue |
             Sort-Object { [int]([regex]::Match($_.Name,'\d+').Value) } |
             ForEach-Object { "images/$slug/$($_.Name)" }
  }

  $cdir = Join-Path $root "custom\$slug"
  if (Test-Path $cdir) {
    $custom = Get-ChildItem $cdir -File -Include *.jpg,*.jpeg,*.png,*.webp -ErrorAction SilentlyContinue |
              Sort-Object Name | ForEach-Object { "custom/$slug/$($_.Name)" }
  }

  $out += [PSCustomObject]@{
    slug    = $slug
    figures = @($figs)
    pages   = @($pages)
    custom  = @($custom)
  }
}

$json = $out | ConvertTo-Json -Depth 6 -Compress
$dst = Join-Path $root "image-index.js"
Set-Content -Path $dst -Value ("window.IMAGE_INDEX = " + $json + ";") -Encoding utf8

$tot = ($out | ForEach-Object { $_.figures.Count + $_.pages.Count + $_.custom.Count } | Measure-Object -Sum).Sum
Write-Host ("OK -> {0}" -f $dst)
Write-Host ("  {0} projects, {1} images total" -f $out.Count, $tot)
foreach ($p in $out) {
  if ($p.custom.Count -gt 0) {
    Write-Host ("  + {0}: {1} custom" -f $p.slug, $p.custom.Count) -ForegroundColor Cyan
  }
}
