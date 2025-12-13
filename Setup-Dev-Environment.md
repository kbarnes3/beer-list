Setup Your Development Environment
=================================

These directions currently assume your ideal dev environment is on Windows using PowerShell. Other configurations are possible, but not yet documented.

This project uses PowerShell scripts based on GitHub's [Scripts To Rule Them All](https://github.com/github/scripts-to-rule-them-all) to make common developer flows easier.

To setup your dev environment
-----------------------------

1. Install all the required tools. This includes:  
    a. The latest release of [Node](https://nodejs.org/).
    b. The latest release of [Git](http://git-scm.com/downloads).
1. Clone the repo locally and open a PowerShell prompt in the root folder.
1. Run scripts\Console.ps1. This script will install or update Angular and any other dependencies as needed.
1. Run the site running `Start-Server -OpenBrowser`.

After the initial setup
-----------------------

1. After the initial setup, run scripts\Console.ps1 to ensure everything is up to date. Console.ps1 also defines a few helpful functions in your PowerShell environment:  
    **Start-Server**: Starts the Angular dev server.  
    **Invoke-Npm** and **Invoke-Ng**: Call npm or ng with the given arguments. These functions ensure you are in the correct directory where these commands make sense.  
    **Update-DevEnvironment**: calls scripts\Update.ps1 (see below for more details).
1. After pulling/merging/etc. it's a good idea to run Update-DevEnvironment or scripts\Update.ps1 to ensure any new or updated dependencies are setup correctly.
1. If you want to reset your local repo back to a clean state, run scripts\Setup.ps1 -GitClean. Be warned that this will delete a lot of files, such as any untracked files and all your node_modules.
