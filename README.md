# MovieClub-RuntimeTerror

## Team members
The members of the team are:
- Leonard Marshall Afzal
- Jose Carneiro de Sousa
- Alessio Wu
- Noah Cheeseman
- Zsollt Balla
- Quang Nguyen
- Said Mammadov
- William Cooper

## Project structure


## Deployed version of the application

**TBA

## Installation instructions
To install the software and use it in your local development environment, you must first set up and activate a local development environment.  From the root of the project:

```
$ virtualenv venv
$ source venv/bin/activate
```

Install all backend required packages:

```
$ pip3 install -r backend-requirements.txt
```

Install all required frontend packages:
 ```
 $ npm install
 ```

Migrate the database:

```
$ python3 manage.py migrate
```

Seed the development database with:

```
$ python3 manage.py seed
```

Run all backend tests with:
```
$ python3 manage.py test
```

Run all frontend tests with:
cd into frontend/socialscene
```
$ python npm test

```

*The above instructions should work in your version of the application.  If there are deviations, declare those here in bold.  Otherwise, remove this line.*


## Sources
The packages used by this application are specified in `requirements.txt` and `packages.json`

