@echo off
set source_file=%~dp0patients_db.db
set destination_folder=C:\backups

rem Get the current date and time
for /f "tokens=2 delims==" %%I in ('"wmic os get localdatetime /value"') do set datetime=%%I
set timestamp=%datetime:~0,4%%datetime:~4,2%%datetime:~6,2%_%datetime:~8,2%%datetime:~10,2%%datetime:~12,2%

rem Create destination folder if it doesn't exist
if not exist "%destination_folder%" mkdir "%destination_folder%"

rem Copy the file with the timestamp appended to the file name
copy "%source_file%" "%destination_folder%\patients_db_%timestamp%.db"
