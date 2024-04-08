● Folder structure:
1. Apica is the root folder of the assignment which contains two folders Backend and
Frontend.

● Run backend code
1. Navigate to the folder Apica/Backend/cmd
2. Write the command in the console go run main.go.
3. The backend server will be running on the http://localhost:8080
   
● Run the Frontend code
1. Navigate to the folder Apica/Frontend/lru
2. Write the command in your console npm install (node should be installed in your system).
3. If it fails to install write the command npm install –force in the console
4. After that write npm run start to start the localhost server for the Front end
(http://localhost:3000/)

API Details

● http://localhost:8080/lru/add (POST API)
1. Payload { "val": "provide value", "key": "provide key"}
   
● http://localhost:8080/lru/get?key={query_params} (GET API)

● Basic Auth Details
1. username: lru@sonu, password: 12345
