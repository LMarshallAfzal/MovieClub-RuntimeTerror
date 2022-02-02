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


## Installation instructions
To install the software and use it in your local development environment, you must first set up and activate a local development environment.  From the root of the project:

```
$ virtualenv venv
$ source venv/bin/activate
```

Install all required packages:

```
$ pip3 install -r requirements.txt
```

Migrate the database:

```
$ python3 manage.py migrate
```

Seed the development database with:

```
$ python3 manage.py seed
```

Run all tests with:
```
$ python3 manage.py test
```

*The above instructions should work in your version of the application.  If there are deviations, declare those here in bold.  Otherwise, remove this line.*


## Sources
The packages used by this application are specified in `requirements.txt`

*Declare are other sources here.*
