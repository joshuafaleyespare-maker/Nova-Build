$dir = "C:\Users\jahei\OneDrive\Documents\Claude\NovaBuild"
$files = @("index.html","cart.html","checkout.html","admin.html","product.html","novabuild.js")

$replacements = @{
    [char]0x00e2 + [char]0x0080 + [char]0x0093 = [char]0x2013  # en dash
    [char]0x00e2 + [char]0x0080 + [char]0x0094 = [char]0x2014  # em dash
    [char]0x00e2 + [char]0x0080 + [char]0x0098 = [char]0x2018  # left single quote
    [char]0x00e2 + [char]0x0080 + [char]0x0099 = [char]0x2019  # right single quote
    [char]0x00e2 + [char]0x0080 + [char]0x009c = [char]0x201c  # left double quote
    [char]0x00e2 + [char]0x0080 + [char]0x009d = [char]0x201d  # right double quote
}

foreach ($f in $files) {
    $path = Join-Path $dir $f
    if (-not (Test-Path $path)) { continue }

    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $orig = $content

    foreach ($bad in $replacements.Keys) {
        $content = $content.Replace($bad, $replacements[$bad])
    }

    if ($content -ne $orig) {
        [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed: $f"
    } else {
        Write-Host "Clean: $f"
    }
}
Write-Host "Done."
