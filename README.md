# OneNote ViDeX Project

## First things first

1.  Join the Slack team
2.  Install Git
3.  Install NodeJS (latest or you may run into build issues)
4.  Install VS Code (or another editor)
5.  Clone repo at http://github.com/OneNoteDev/ViDeX

## Start Development Environment

Important: Make sure you have docker-compose installed, using `docker-compose -v` to verify the installation

### Windows 10 Professional

1.  Download Docker from https://store.docker.com/editions/community/docker-ce-desktop-windows

### Mac OSX

1.  Download Docker from https://store.docker.com/editions/community/docker-ce-desktop-mac

Add a name to the variables.env (https://github.com/OneNoteDev/ViDeX/blob/e271f980dbdc48037ce3a969f351c15eb95742ec/variables.env#L25) `AZURE_STORAGE_QUEUE_NAME`

Running `docker-compose up` under the root folder. This will bring up: webpack-dev-server, backend server, and mongodb.

You can also access those containers directly:

server: `localhost:8080`
mongodb: `localhost:27017`

Create issue ticket if you cannot start the development environment, and assign to @SamSunani

## Run `yum install` on your local

This code repo contains git pre-commit hook, so please run `yum-install` evey time you checkout the latest change.
