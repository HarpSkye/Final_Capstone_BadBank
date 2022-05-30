:: Restrict scope of all environment variables
setlocal
verify >nul

:: Deactivate external conda.
call %PREFIX%\condabin\deactivate.bat
if errorlevel 1 exit 1

:: Configure special conda directories and files.
set "CONDARC=%PREFIX%\.condarc"
set "CONDA_ENVS_DIRS=%PREFIX%\envs"
set "CONDA_PKGS_DIRS=%PREFIX%\pkgs"

:: Add stubs for special conda directories and files.
copy nul %CONDARC%
if errorlevel 1 exit 1
mkdir %CONDA_ENVS_DIRS%
if errorlevel 1 exit 1
mkdir %CONDA_PKGS_DIRS%
if errorlevel 1 exit 1

:: Activate the built conda.
conda activate base
if errorlevel 1 exit 1

:: Run conda tests.
call %CD%\test_conda.bat
if errorlevel 1 exit 1

:: Deactivate the built conda when done.
:: Not necessary, but a good test.
conda deactivate
if errorlevel 1 exit 1

endlocal




SET CONDA_SHLVL=
IF %ERRORLEVEL% NEQ 0 exit /B 1
CALL %PREFIX%\condabin\conda_hook.bat
IF %ERRORLEVEL% NEQ 0 exit /B 1
conda.bat activate base
IF %ERRORLEVEL% NEQ 0 exit /B 1
FOR /F "delims=" %%i IN ('python -c "import sys; print(sys.version_info[0])"') DO set "PYTHON_MAJOR_VERSION=%%i"
IF %ERRORLEVEL% NEQ 0 exit /B 1
SET TEST_PLATFORM=win
IF %ERRORLEVEL% NEQ 0 exit /B 1
FOR /F "delims=" %%i IN ('python -c "import random as r; print(r.randint(0,4294967296))"') DO set "PYTHONHASHSEED=%%i"
IF %ERRORLEVEL% NEQ 0 exit /B 1
SET
IF %ERRORLEVEL% NEQ 0 exit /B 1
where conda
IF %ERRORLEVEL% NEQ 0 exit /B 1
conda info
IF %ERRORLEVEL% NEQ 0 exit /B 1
conda create -y -p .\built-conda-test-env
IF %ERRORLEVEL% NEQ 0 exit /B 1
conda.bat activate .\built-conda-test-env
IF %ERRORLEVEL% NEQ 0 exit /B 1
ECHO %CONDA_PREFIX%
IF %ERRORLEVEL% NEQ 0 exit /B 1
IF NOT "%CONDA_PREFIX%"=="%CD%\built-conda-test-env" EXIT /B 1
IF %ERRORLEVEL% NEQ 0 exit /B 1
conda.bat deactivate
IF %ERRORLEVEL% NEQ 0 exit /B 1
SET MSYSTEM=MINGW%ARCH%
IF %ERRORLEVEL% NEQ 0 exit /B 1
SET MSYS2_PATH_TYPE=inherit
IF %ERRORLEVEL% NEQ 0 exit /B 1
SET CHERE_INVOKING=1
IF %ERRORLEVEL% NEQ 0 exit /B 1
FOR /F "delims=" %%i IN ('cygpath.exe -u "%PREFIX%"') DO set "PREFIXP=%%i"
IF %ERRORLEVEL% NEQ 0 exit /B 1
bash -lc "source %PREFIXP%/Scripts/activate"
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
