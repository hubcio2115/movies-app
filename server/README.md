## Data base config

After the installation of database change the config in `index.js` (lines 15-21):

```js
const client = new Pool({
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT || 5432, // put your port here
  database: process.env.PGDB || "", //put your database engine here
  user: process.env.PGUSER || "",
  password: process.env.POSTGRES_PASS || "", // put your password here
});
```

## Initializing backend

Installation of required packages:

```
yarn install
```

Starting the backend

```
yarn start
```

Project is available at:

```
http://localhost:3000
```

## Available endpoints

```json
GET /movies // Downloading all of the movies

// Response
[
    {
        "id": 1,
        "title": "The Green Mile",
        "director": "Frank Darabont",
        "genre": "Dramat",
        "year": 1999,
        "description": "Retired prison guard...",
        "image_url": "https://...",
        "rating_count": 7,
        "rating": 4
    }
]
```

```json
GET /movie/{id} // Downloading a movie of set id

// Response
{
    "id": 1,
    "title": "The Green Mile",
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999,
    "description": "Retired prison guard...",
    "image_url": "https://...",
    "rating_count": 7,
    "rating": 4
}
```

```json
POST /movie // Adding a movie

// Parameters - example body of the request
{
    "title": "The Green Mile",
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999, // value between year 1000 and today's
    "description": "Retired prison guard...",
    "image_url": null
}

// Response
{
    "title": "The Green Mile", // uniq value
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999,
    "description": "Retired prison guard...",
    "image_url": null, // can be null
    "rating_count": 7,
    "rating": 4
}
```

```json
PUT /movie/{id} // Editing a movie of said id

// Parameters - example body request
{
    "title": "The Green Mile", // uniq value
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999, // value between year 1000 and today's
    "description": "Retired prison guard...",
    "image_url": "https://..." // can be null
}

// Response
{
    "title": "The Green Mile",
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999,
    "description": "Retired prison guard...",
    "image_url": null
}
```

```json
DELETE /movie/{id} // Deleting a movie of said id
```

```json
GET /movie/{id}/rate // Downloading the rating of a movie

// Response
{
    "id": "1",
    "rating_count": 7,
    "rating": 4
}
```

```json
PATCH /movie/{id}/rate // Setting a review score of a movie

// Parameters - query
score // ?score={score}, where score is between 1 and 5

// Response
{
    "id": 1,
    "title": "The Green Mile",
    "director": "Frank Darabont",
    "genre": "Dramat",
    "year": 1999,
    "description": "Retired prison guard...",
    "image_url": "https://...",
    "rating_count": 10,
    "rating": 4.3
}
```
