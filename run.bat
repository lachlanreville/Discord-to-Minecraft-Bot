@echo off
echo Starting..
:main
node main.js
echo Restarting Bot..
timeout 5
goto main