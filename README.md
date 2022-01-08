# advisor001-api

[Developer Notes](docs/developer.md)

[API Documentation](docs/api.md)

package.json will install eslint, prettier, and dependent sub-packages

install the following vscode extensions:
ejs, eslint, prettier, prettier eslint

make the following vscode setting changes:
Editor: Format on Save - turn on
Editor: Default Formatter - Prettier - Code Formatter (esbenp.prettier-vscode)
Eslint › Code Actions On Save: Mode - set to problems

development environment setup

- create a .env
- install postgres on localhost, set master password
- create a database (use postgres as owner), accept defaults
- set in .env
  PG_CONNECTION_STRING=postgres://postgres:<masterpassword>@localhost:5432/<dbname>

Development Conventions

- modules are either:
  - Interface, module.exports is an object, i.e. Services, Modules
  - Instance, module.exports is a function returning in an instance, Apps and Routes
