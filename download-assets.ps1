# Downloads the official Ragnarok: The New World assets into .\assets (Windows PowerShell)
$ErrorActionPreference = "Continue"
Set-Location $PSScriptRoot
New-Item -ItemType Directory -Force -Path assets\images\screenshots, assets\videos | Out-Null
$files = @(
  @("assets/images/hero-bg.webp", "https://abres.octlib.com/site/sea_official/webp/home-bg-f4e0102e.webp"),
  @("assets/images/key-art.webp", "https://abres.octlib.com/site/sea_official/webp/download-img1-02c1e68e.webp"),
  @("assets/images/logo.webp", "https://abres.octlib.com/site/sea_official/webp/header-logo-a58287da.webp"),
  @("assets/images/screenshots/ss-01-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/a5eee3c0eb5a78ae27e06ffc484e30df5492f173/ss_a5eee3c0eb5a78ae27e06ffc484e30df5492f173.600x338.jpg"),
  @("assets/images/screenshots/ss-01.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/a5eee3c0eb5a78ae27e06ffc484e30df5492f173/ss_a5eee3c0eb5a78ae27e06ffc484e30df5492f173.1920x1080.jpg"),
  @("assets/images/screenshots/ss-02-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/49379583f1a9b7b785fb5e8df9999444b4adca02/ss_49379583f1a9b7b785fb5e8df9999444b4adca02.600x338.jpg"),
  @("assets/images/screenshots/ss-02.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/49379583f1a9b7b785fb5e8df9999444b4adca02/ss_49379583f1a9b7b785fb5e8df9999444b4adca02.1920x1080.jpg"),
  @("assets/images/screenshots/ss-03-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/613a821770b711254b794ec654887573b8e67d18/ss_613a821770b711254b794ec654887573b8e67d18.600x338.jpg"),
  @("assets/images/screenshots/ss-03.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/613a821770b711254b794ec654887573b8e67d18/ss_613a821770b711254b794ec654887573b8e67d18.1920x1080.jpg"),
  @("assets/images/screenshots/ss-04-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/72c32dd5e97f198ae9662c35263d1a1d2011e632/ss_72c32dd5e97f198ae9662c35263d1a1d2011e632.600x338.jpg"),
  @("assets/images/screenshots/ss-04.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/72c32dd5e97f198ae9662c35263d1a1d2011e632/ss_72c32dd5e97f198ae9662c35263d1a1d2011e632.1920x1080.jpg"),
  @("assets/images/screenshots/ss-05-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/ed50bc838811f72959e6f224334f2b8acdd8474a/ss_ed50bc838811f72959e6f224334f2b8acdd8474a.600x338.jpg"),
  @("assets/images/screenshots/ss-05.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/ed50bc838811f72959e6f224334f2b8acdd8474a/ss_ed50bc838811f72959e6f224334f2b8acdd8474a.1920x1080.jpg"),
  @("assets/images/screenshots/ss-06-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/eaf59192ab042d69bacd06299272d7ca8209ab61/ss_eaf59192ab042d69bacd06299272d7ca8209ab61.600x338.jpg"),
  @("assets/images/screenshots/ss-06.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/eaf59192ab042d69bacd06299272d7ca8209ab61/ss_eaf59192ab042d69bacd06299272d7ca8209ab61.1920x1080.jpg"),
  @("assets/images/screenshots/ss-07-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/5e713dc34913ffbf4c357214f43d1efa65e02a20/ss_5e713dc34913ffbf4c357214f43d1efa65e02a20.600x338.jpg"),
  @("assets/images/screenshots/ss-07.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/5e713dc34913ffbf4c357214f43d1efa65e02a20/ss_5e713dc34913ffbf4c357214f43d1efa65e02a20.1920x1080.jpg"),
  @("assets/images/screenshots/ss-08-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/0c4d07f205be20c10329991aa1aa4457b70cc126/ss_0c4d07f205be20c10329991aa1aa4457b70cc126.600x338.jpg"),
  @("assets/images/screenshots/ss-08.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/0c4d07f205be20c10329991aa1aa4457b70cc126/ss_0c4d07f205be20c10329991aa1aa4457b70cc126.1920x1080.jpg"),
  @("assets/images/screenshots/ss-09-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/339cac8fd0fc12cece48b318ecfbe17eb20c741e/ss_339cac8fd0fc12cece48b318ecfbe17eb20c741e.600x338.jpg"),
  @("assets/images/screenshots/ss-09.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/339cac8fd0fc12cece48b318ecfbe17eb20c741e/ss_339cac8fd0fc12cece48b318ecfbe17eb20c741e.1920x1080.jpg"),
  @("assets/images/screenshots/ss-10-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/cfe6e884a847c78be6e677897be474b9db30c043/ss_cfe6e884a847c78be6e677897be474b9db30c043.600x338.jpg"),
  @("assets/images/screenshots/ss-10.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/cfe6e884a847c78be6e677897be474b9db30c043/ss_cfe6e884a847c78be6e677897be474b9db30c043.1920x1080.jpg"),
  @("assets/images/screenshots/ss-11-600.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/cfab5e170a952d5178e993a6f6733b5562175a2d/ss_cfab5e170a952d5178e993a6f6733b5562175a2d.600x338.jpg"),
  @("assets/images/screenshots/ss-11.jpg", "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4212480/cfab5e170a952d5178e993a6f6733b5562175a2d/ss_cfab5e170a952d5178e993a6f6733b5562175a2d.1920x1080.jpg"),
  @("assets/images/world-bg-1.webp", "https://abres.octlib.com/site/sea_official/webp/game-bg1-d96f0016.webp"),
  @("assets/images/world-bg-5.webp", "https://abres.octlib.com/site/sea_official/webp/game-bg5-b7e311be.webp"),
  @("assets/videos/trailer.mp4", "https://gdownload.hwrescdn.com/auto_system_upload/2026/07/1783070591999-47.mp4")
)
foreach ($f in $files) { Write-Host "-> $($f[0])"; try { Invoke-WebRequest -Uri $f[1] -OutFile $f[0] -UseBasicParsing } catch { Write-Warning "failed: $($f[1])" } }
Write-Host "Done."
