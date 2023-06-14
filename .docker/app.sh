#!/bin/bash

# Script para executar os comandos no serviço "app" do Docker Compose

# Instala as dependencias
npm install

# Gerar o build
npm run build

# Iniciar o serviço
npm run start:dev
