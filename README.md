# Final work on the backend at the web development course

|Public IP address|Domains|Type|Protocols|
|:-------------:|:-------------:|:-----:|:---:|
|130.193.36.142|api.news-explorer.website|API|http, https|
|130.193.36.142|news-explorer.website - [News Explorer](https://news-explorer.website)|Frontend|http, https|

`Версия 0.2.1`
## Fifteenth project work of the web-development course
Ссылка на проект https://github.com/nik-di/web-fqw-api

#### В проекте реализованы следующие функции по обращению к API по доменному имени:
* в ответ на запрос `POST /signin`, сервер вернёт `200 ОК` после успешного входа;
* в ответ на запрос `POST /signup`, сервер вернёт JSON-объект зарегистрированного пользователя с переданными данными.
*Если пользователь с переданным `email` уже существует в базе, API вернёт ошибку*;
* в ответ на запрос `GET /users/me`, сервер вернёт JSON-объект вошедшего в систему пользователя;
* в ответ на запрос `GET /articles` сервер вернёт JSON-объект статей из базы данных;
* в ответ на запрос `POST /articles`, сервер вернёт JSON-объект созданной статьи с переданными данными;
* в ответ на запрос `DELETE /articles/:identifier`, сервер вернёт JSON-объект карточки с переданным после `/articles` идентификатором и удалит эту карточку из базы данных;
* если карточки с запрошенным идентификатором нет, API вернет 404 статус ответа и сообщение: `"Нет карточки с таким id"`;
* при запросе на несуществующий адрес, API вернет 404 статус ответа и сообщение: `"This page was not found"`.

#### Для успешного выполнения запросов необходимо зарегистрироваться и войти в систему 
* на `POST /signup` необходимо передать в теле запроса объект с полями:
```javascript 
{ 
    "name": String,
    "password": String(min 6 characters),
    "email": String(type email) 
}
```
и заголовок `Content-Type: application/json`**;**
также должна быть разрешена передача `Cookie`-файлов при запросе **;**
* на `POST /signin` необходимо передать в теле запроса объект с полями:
```javascript 
{ 
    "password": String(min 6 characters),
    "email": String(type email) 
}
```
и заголовок `Content-Type: application/json`**.**
также должна быть разрешена передача `Cookie`-файлов при запросе **;**
