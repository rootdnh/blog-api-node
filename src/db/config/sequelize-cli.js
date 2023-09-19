import config from "./config.js"

export default {
  "dev": {
    "username": config.username,
    "password": config.password,
    "database": config.database,
    "host": config.host,
    "port": config.port,
    "dialect": config.dialect
  },
  "test": {
    "storage": config.storage,
    "dialect": config.dialect,
    "logging": true
  },
  "prod": {
    "username": config.username,
    "password": config.password,
    "database": config.database,
    "host": config.host,
    "port": config.port,
    "dialect": config.dialect
  }
}

