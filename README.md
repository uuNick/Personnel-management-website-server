# Система управления персоналом ОАО "Зенит"

Этот проект представляет собой полнофункциональное веб-приложение для управления персоналом, разработанное на базе Node.js (Express) и React. Все компоненты развернуты в изолированном окружении с использованием Docker Compose, включая базу данных PostgreSQL.

## Структура проекта

Проект организован следующим образом:

| Директория/Файл | Описание |
|-------------|-------------|
| docker-compose.yml  | Главный файл конфигурации Docker, определяющий сервисы (db, server, client) и их взаимосвязи  |
| client/  | Содержит исходный код Frontend  |
| client/Dockerfile  | Инструкции по сборке контейнера Frontend  |
| server/  | Содержит исходный код Backend  |
| server/Dockerfile    | Инструкции по сборке контейнера Backend  |
| server/src/.env    | Файл с переменными окружения для Backend (учетные данные БД, порты)    |
| backup-db-simple.ps1  | PowerShell скрипт для создания резервной копии БД  |
| restore-db-simple.ps1  | PowerShell скрипт для восстановления БД из дампа  |
| .env.example  | Список необходимых для заполнения переменных окружения   |


## Пошаговая инструкция по запуску

Для запуска проекта необходимо иметь установленные Docker и Docker Compose.

1. Перейти в папку проекта coursework;
2. Выполнить команду `docker-compose up -d --build`

Frontend будет доступен по адресу `http://localhost:3000`

Backend будет доступен по адресу `http://localhost:7001`

## Пример заполнения файл .env
```
# ОБЩИЕ НАСТРОЙКИ ПРИЛОЖЕНИЯ
API_PORT=3001
CLIENT_PORT=3000


# НАСТРОЙКИ БАЗЫ ДАННЫХ
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zenit_hr
DB_USER=zenit_user
DB_PASSWORD=change_this_secure_password
DB_DIALECT=postgres


# НАСТРОЙКИ БЕКЕНДА
SECRET_KEY=change_this_very_secure_jwt_secret_key
```

## Резервное копирование и восстановление 

Для удобного управления данными в среде Windows используйте предоставленные скрипты PowerShell.

1. Создание резервной копии БД и сохранение дампа в файл: `.\backup-db-simple.ps1`


2. Восстановление из резервной копии БД: `.\restore-db-simple.ps1`

## Возможные ошибки и устранение

| Проблема | Причина | Решение | 
|-------------|-------------|-------------|
| Address already in use  | Порты 3000 или 7001 заняты другим приложением на вашей хост-машине  | Или остановите конфликтующее приложение, или измените внешние порты в docker-compose.yml |
| Ошибка после restore-db-simple.ps1  | Скрипт не может найти файл dump.sql  | Убедитесь, что вы запустили backup-db-simple.ps1 хотя бы один раз, прежде чем пытаться восстановить данные |
| Container zenit_backend_container is unhealthy | Сервер не смог подключиться к БД (ошибки в zenit_backend_container logs: ECONNREFUSED)   |  Убедитесь, что DB_PASSWORD в server/src/.env совпадает с POSTGRES_PASSWORD в docker-compose.yml; Убедитесь, что DB_HOST установлен как db |


