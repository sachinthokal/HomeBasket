@ECHO OFF
SETLOCAL
SET MVNW_DIR=.mvn\wrapper
SET MVNW_JAR=%MVNW_DIR%\maven-wrapper.jar
SET MVNW_DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar

IF NOT EXIST %MVNW_DIR%\ (
    mkdir %MVNW_DIR%
)

IF NOT EXIST %MVNW_JAR% (
    echo Downloading Maven Wrapper...
    powershell -Command "(New-Object Net.WebClient).DownloadFile('%MVNW_DOWNLOAD_URL%', '%MVNW_JAR%')"
)

java -Dmaven.multiModuleProjectDirectory=%CD% -cp %MVNW_JAR% org.apache.maven.wrapper.MavenWrapperMain %*
