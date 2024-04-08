# Tasklists

## Installation and Usage

1. **Clone the repository:**: ```https://github.com/Arseniia-Damaksina/React-App-2```

2. **Database:**
- Navigate to the server directory and install dependencies:

```bash
cd React-App-2
cd server
npm install
```

- Rename file ```.env.example``` to ```.env``` and fill in the credentials to access the database.
- You can use this:

```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB=taskboards
```
- To setup the database using Docker run

```bash
docker compose up -d
```

3. **Backend:**
- Run the backend local server:

```bash
npm run start:dev
```

4. **Setup Frontend**
- Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```
- Rename file ```.env.example``` to ```.env``` and fill in the url of the backend API.
- You can use this:
```bash
VITE_API_BASE_URL=http://localhost:3000/api
```
- Run your frontend app:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)
