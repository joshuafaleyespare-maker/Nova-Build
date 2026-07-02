@echo off
cd /d "C:\Users\jahei\OneDrive\Documents\Claude\NovaBuild"
set "GIT=C:\Users\jahei\AppData\Local\GitHubDesktop\app-3.5.12\resources\app\git\cmd\git.exe"

"%GIT%" status --short > nul 2>&1
if errorlevel 1 ( echo Git not found. & pause & exit /b )

for /f %%i in ('"%GIT%" status --porcelain') do set HAS_CHANGES=1
if not defined HAS_CHANGES (
  echo No changes to publish.
  pause
  exit /b
)

echo.
echo Files changed:
"%GIT%" status --short
echo.
set /p MSG=Commit message (press Enter to use timestamp):
if "%MSG%"=="" (
  for /f "tokens=1-4 delims=/ " %%a in ("%date%") do set D=%%c-%%b-%%a
  for /f "tokens=1-2 delims=: " %%a in ("%time%") do set T=%%a:%%b
  set MSG=Update %D% %T%
)

"%GIT%" add -A
"%GIT%" commit -m "%MSG%"
"%GIT%" push
echo.
echo Done! Visit your GitHub repo to confirm.
pause
