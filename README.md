# BTP Project

#### Website: http://share.fh.iiitd.edu.in/

## Screenshots

![image](https://user-images.githubusercontent.com/44255731/180018625-ea2e5dbb-593c-49be-b006-6c303ba8bc19.png)
![image](https://user-images.githubusercontent.com/44255731/180018877-d2432399-a136-4344-bdaf-d8ddc8b149df.png)
![image](https://user-images.githubusercontent.com/44255731/180017731-573f2d49-6b9b-49c0-8d20-ff7bd51b7de0.png)
![image](https://user-images.githubusercontent.com/44255731/180017821-3288c2b5-46c2-4e88-80de-ee99ba946edc.png)
![image](https://user-images.githubusercontent.com/44255731/180017898-eb063488-c02b-4ae7-8c0e-00b11a5c87f6.png)
![image](https://user-images.githubusercontent.com/44255731/180017999-56ba0bff-99c7-48f0-a446-7a8980f28619.png)
![image](https://user-images.githubusercontent.com/44255731/180018122-0fcbf021-b651-4ab1-9fb4-557286b2be21.png)
![image](https://user-images.githubusercontent.com/44255731/180018196-fb05051a-b733-4448-aec1-e20381e5a87f.png)


## Prerequisite

- Node - ^14.x
- NPM - ^8.1.x
- Python - ^3.6
- Pipenv - ^11.9.0
- Virtualenv - ^20.0.17

## Docker Commands

```
docker build -t shareiiit .
```

```
docker images
```

```
docker image rm e8a702109da7
```

```
docker run -d -p 3000:3000 --name react-app react-image
```

```
docker-compose up
docker-compose down
```

## Local Development

### Frontend :

Change URL in [Url.js](frontend/src/Store/Urls.js) according to your Backend site and run the following commands

```
cd frontend
npm install
npm run start
```

### Backend :

- Update the database details in [settings.py](backend/backend/settings.py#L106) and OSA Domain in [settings.py](backend/backend/settings.py#L177)
- Get inside the backend directory

```
cd backend
```

- Activate the virtual environment using either pipenv or virtualenv

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

- Create migrations

```
python manage.py makemigrations
python manage.py migrate
```

- If db needs to populated with categories and/or skills, run

```
python manage.py runscript init-db --script-args add-categories
python manage.py runscript init-db --script-args add-skills
```

- Check .env file. For dev mode, set DJANGO_DEV as 'true' and 'false' for prod mode.

- Start the server

```
python manage.py runserver
```

## NGINX deployment on server

- Build the frontend code using `npm run build` on your local computer and push the `build` folder to the repo
- `git pull` on the entire code on ssh server
- Copy frontend build folder to /var/www/

```
sudo cp -r frontend/build/* /var/www/share.osa.iiitd.edu.in/
```

- Install packages and update migrations of backend

```
source backend/venv/bin/activate
pip install -r requirements.txt
python backend/manage.py makemigrations
python backend/manage.py migrate
python backend/manage.py collectstatic --noinput
```

- Copy static folders of admin panel to /var/www/

```
sudo cp -r backend/staticfiles/* /var/www/share.osa.iiitd.edu.in/static/
```

- Restart Socket and Nginx

```
sudo systemctl restart share-iiitd.socket
sudo systemctl restart nginx
```

All commands are available in [server.sh](server.sh)

### Reference

https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04

## Project Structure

### Backend

The django project has been dividied into three parts based on the functionality: accounts, posts and messaging. The code corresponding to each part is inside that particular django app.

The code for notification generation is in `posts/signals.py` file.

The scripts folder contains two scripts:

- init-db script to initialize a db if required, the script makes use of skills.csv file which has been sourced from https://github.com/varadchoudhari/LinkedIn-Skills-Crawler

- delete-posts to for permanent deletion of posts.
