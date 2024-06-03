# English
### Vilantis test task

The project is available at [Github Pages](https://george-avsa.github.io/vilantis-test-task/)

To implement page-by-page queries, I considered 2 options:

 - make a page-by-page request using offset, do a duplicate check and, if necessary, make an additional request so that there are 50 records
 - get a list of all IDs at once, eliminate duplicates and create an object that stores a list of IDs for the desired page.
As a result, the first method was implemented (without a filter): there are few duplicates, but a lot of records, storing all this with the user is not the best idea. There is a problem with the correct offset calculation, for example, the case with the first page: 49 unique ids out of 50, respectively, you need to make 1 more request to get an additional ID. That is:
 - 1 page: offset: 0, limit: 51
 - 2 page: offset: 51, limit: 50 And so on.

axios is used to work with queries, which already implements the status code check, and the code looks more concise. The getData function uses axios.post, when an error occurs, it is recursively called (including when the status code is not 2xx) until the 2xx status arrives or the function is called 5 times. Each error is output by console.error, and when 5 errors are reached, a connection error is displayed to the user.


# Russian

### Ссылка на Github Pages
[Посмотреть проект можно по ссылке](#)

### Установка и запуск локально
`npm i`
`npm start`

### Описание подходов реализации
Для реализации постраничных запросов рассматривал 2 варианта:
 - постранично делать запрос с использованием offset, делать проверку на дубликат и при необходимости делать дополнительный запрос, чтобы было 50 записей
 - получить список всех id сразу, исключить дубликаты и создать объект, который хранит список id для нужной страницы. 
В итоге был реализован первый способ (без фильтра): дубликатов немного, но много записей, хранить все это у пользователя - не лучшая идея.  Возникает проблема с правильным подсчетом offset, например, случай с первой страницей: 49 уникальных айди из 50, соответсвенно необходимо сделать еще 1 запрос для получения дополнительного айди. То есть:
 - 1 страница: offset: 0, limit: 51
 - 2 страница: offset: 51, limit: 50
И так далее.

Для работы с запросами используется axios, в котором уже реализована проверка status code, да и код выглядит лаконичнее. Функция getData использует axios.post, при появлении ошибки она рекурсивно вызывается (в том числе, когда статус код не 2хх) до тех пор, пока не придет 2xx статус или функция не вызовется 5 раз. Каждая ошибка выводится console.error, а при достижении 5 ошибок, пользователю отображается ошибка подключения.  

### P.S.
Поздно начал делать, к сожелению, не успел реализовать многие задумки. Перенести весь код на ts. Также хотел заменить классовый подход на стейт-менеджер.
