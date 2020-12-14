# introduction
This project is made for web software development course.

## Setup

1. Open postgres database and run the following sql command in the sql:
```
create table MorningReport (
id serial primary key,
userid integer references users(id),
date date not null,
sleepDuration Integer not null,
sleepQuality Integer not null,
genericMood Integer not null
)

create table EveningReport (
id serial primary key,
userid integer references users(id),
date date not null,
timeSportsExercise Integer not null,
timeStudy Integer not null,
qualityEating Integer not null,
genericMood Integer not null
)


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

```

2. After creating necessary table and indices, setup up your database in either of the following way:

    2.1. create a database object like the following

        hostname: "<hostname>",
        database: "<postgrse>",
        user: "<user name for you database>",
        password: "<password for the database>",
        port: <port for the database>
    
    and assign the above object to config.database object inside config.js file
    
    2.2. define DATABASE_URL in the environment variable and run the application using the step 3

    2.3. set the following variables in environment variable (on windows)

        * PGPORT - port on which PostgreSQL is running on.
        * PGDATABASE - database name.
        * PGHOST - database host (hostname).
        * PGUSER - database username.
        * PGPASSWORD - database password.

3. if you chose either 2.1 or 2.2 or 2.3 to setup your database:
    
    run the following command: your working directory should be the same as app.js
    
    ```
        deno run --allow-all --unstable app.js
    ```

    if you don't want to chose any of the above to setup your database (only in linux)

    ```
        $ PGPORT=ur_port PGDATABASE=my_db PGHOST=your_host PGUSER=your_pg_user PGPASSWORD=your_password deno run --allow-all --unstable app.js
    ``` 

4. to run the test, run the following command: your working directory should be the same as app.js
```
    deno test --allow-all --unstable
```

5. You can find the working application in the https://monitor-anmol.herokuapp.com/

## Notes
1. For morning and evening reports, I have used two separate pages instead of one. Both of them can be accessed by the landing page.

2. Landing page has a login / registration button OR has a logout button on the top left

3. For reports, instead of using a slider, I have used input type number because they work better for discrete inputs.