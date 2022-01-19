# BTP Project

#### Website: http://share.osa.iiitd.edu.in/

#### Admin Panel: http://share.osa.iiitd.edu.in/api/admin

## Prerequisite

-   Node - ^14.x
-   NPM - ^8.1.x
-   Python - ^3.6
-   Pipenv - ^11.9.0
-   Virtualenv - ^20.0.17

## Local Development

### Frontend :

Change URL in [Url.js](frontend/src/Store/Urls.js) according to your Backend site and run the following commands

```
cd frontend
npm install
npm run start
```

### Backend :

-   Update the database details in [settings.py](backend/backend/settings.py#L106) and OSA Domain in [settings.py](backend/backend/settings.py#L177)
-   Get inside the backend directory

```
cd backend
```

-   Activate the virtual environment using either pipenv or virtualenv

```
pipenv shell
pipenv install
```

OR

```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

-   Create migrations

```
python manage.py makemigrations
python manage.py migrate
```

-   If db needs to populated with categories and/or skills, run

```
python manage.py runscript init-db --script-args add-categories
python manage.py runscript init-db --script-args add-skills
```

-   Check .env file. For dev mode, set DJANGO_DEV as 'true' and 'false' for prod mode.

-   Start the server

```
python manage.py runserver
```

## NGINX deployment on server

-   Build the frontend code using `npm run build` on your local computer and push the `build` folder to the repo
-   `git pull` on the entire code on ssh server
-   Copy frontend build folder to /var/www/

```
sudo cp -r frontend/build/* /var/www/share.osa.iiitd.edu.in/
```

-   Install packages and update migrations of backend

```
source backend/venv/bin/activate
pip install -r requirements.txt
python backend/manage.py makemigrations
python backend/manage.py migrate
python backend/manage.py collectstatic --noinput
```

-   Copy static folders of admin panel to /var/www/

```
sudo cp -r backend/staticfiles/* /var/www/share.osa.iiitd.edu.in/static/
```

-   Restart Socket and Nginx

```
sudo systemctl restart share-iiitd.socket
sudo systemctl restart nginx
```

All commands are available in [server.sh](server.sh)

### Reference

https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04
