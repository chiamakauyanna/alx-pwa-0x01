# ALX Movie App

## API Overview

The MoviesDatabase API allows you to interact with a comprehensive database of movies, actors, and related data. You can query for information such as movie details, actors' profiles, popular films, and upcoming releases. The API is designed to facilitate easy access to film-related data and is widely used by developers for building movie-related applications, such as movie discovery platforms or recommendation engines.

Key features include:

-   Access to movie details, including titles, genres, release dates, and more.
-   Search capabilities for both movies and actors.
-   Data on trending, popular, and top-rated movies.
-   Actor profiles with detailed information about their career and filmography.

## Version

The current version of the MoviesDatabase API is v3, as outlined in the official documentation.

## Available Endpoints

### 1. `GET /movie/{id}`

-   **Description**: Fetches detailed information about a movie using its unique movie ID.
-   **Example**: `GET /movie/550` (returns details about the movie "Fight Club").

### 2. `GET /search/movie`

-   **Description**: Allows you to search for movies based on a query string (e.g., title).
-   **Example**: `GET /search/movie?query=Inception` (returns a list of movies related to "Inception").

### 3. `GET /actor/{id}`

-   **Description**: Retrieves detailed information about an actor by their unique ID.
-   **Example**: `GET /actor/287` (returns details about actor Brad Pitt).

### 4. `GET /movie/popular`

-   **Description**: Fetches a list of the most popular movies at the moment.
-   **Example**: `GET /movie/popular` (returns a list of popular movies).

### 5. `GET /movie/upcoming`

-   **Description**: Fetches a list of upcoming movies.
-   **Example**: `GET /movie/upcoming` (returns a list of movies that are going to be released soon).

## Request and Response Format

### Request Example

```http
    GET /search/movie?query=Inception HTTP/1.1
    Host: https://developer.themoviedb.org/
    Authorization: Bearer <API_KEY>
```

### Response Example

```json
{
    "page": 1,
    "results": [
        {
            "id": 27205,
            "title": "Inception",
            "release_date": "2010-07-16",
            "overview": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
            "genres": ["Action", "Adventure", "Science Fiction"],
            "vote_average": 8.3
        }
    ],
    "total_results": 10
}
```

In the above example, the request fetches movies related to the query "Inception," and the response includes an array of movie objects with details such as title, release date, overview, and more.

## Authentication

The MoviesDatabase API requires authentication for all requests. Here’s how to authenticate:

1. **Sign Up**: Create an account on the MoviesDatabase website.
2. **Generate API Key**: Obtain your API key from the account settings page.
3. **Include API Key**: Add the API key to the request headers as shown below:

```http
Authorization: Bearer <API_KEY>

## Error Handling

The API uses standard HTTP status codes to indicate errors. Common errors include:

- **400 Bad Request**: The request is malformed or missing required parameters.
- **401 Unauthorized**: The API key is missing or invalid.
- **404 Not Found**: The requested resource does not exist (e.g., invalid movie or actor ID).
- **429 Too Many Requests**: The rate limit has been exceeded.
- **500 Internal Server Error**: The server encountered an error while processing the request.
```

### Example Error Handling in TypeScript

Below is an example of how to handle errors when interacting with the API:

```typescript
try {
    const response = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=Inception",
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
} catch (error) {
    console.error("Failed to fetch movie data:", error.message);
}
```

## Usage Limits and Best Practices

### Usage Limits

-   **Rate Limiting**:
    -   The API allows up to **40 requests per minute**. Exceeding this limit will result in a `429 Too Many Requests` error.
-   **Quota Management**:
    -   Monitor and manage your requests to stay within the allowed limits. Efficient quota management helps prevent disruptions to your application and ensures consistent API performance.

### Best Practices

1. **Secure API Keys**:

    - Keep your API key confidential and avoid exposing it in public repositories or client-side code.
    - Consider using environment variables or secure storage (e.g., AWS Secrets Manager, environment configurations) for managing sensitive information securely.

2. **Implement Caching**:

    - Cache responses locally for a short duration (e.g., 10–15 minutes) to reduce API calls and improve application performance.
    - This is particularly useful for endpoints that return frequently accessed data, such as trending movies, popular actors, or top-rated films.

3. **Use Pagination**:

    - For endpoints that return large datasets, implement pagination to fetch data in smaller, manageable chunks.
    - Example: Add `page=1` or `page=2` to your query to retrieve specific pages of results, reducing the load and response times.

    ```http
    /search/movie?query=Inception&page=1
