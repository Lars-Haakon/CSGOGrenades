@echo off
git pull
git add -A

set /p commitmsg="Skriv kort hvilke endringer du har gjort: "

git commit -m "%commitmsg%"
git push
pause