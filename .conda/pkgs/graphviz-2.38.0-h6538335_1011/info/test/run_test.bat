for %%t in (png, pdf, svg) do (
    dot -T%%t -o sample.%%t sample.dot
    if errorlevel 1 exit 1
)




dot -V
IF %ERRORLEVEL% NEQ 0 exit /B 1
exit /B 0
