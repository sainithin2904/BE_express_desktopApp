> git clone https://github.com/sainithin2904/BE_express_desktopApp/tree/master
> cd BE_express_desktopApp
> ensure you are in master (if not please checkout to master and take a pull : git pull origin master)
> cd Backend
> npm i
> npx nodemon
which will start a server at port 3000, and will be accesible on  http://http://localhost:3000/
http://localhost:3000/ping is a GET call returns "true" jsut to check/ping
http://localhost:3000/read is a GET call, with a query param as index to select that particular object from db.json
Eg : http://localhost:3000/read?index=10

http://localhost:3000/submit is a post call , which accepts the payload in json format and returns the same object with status code 201
