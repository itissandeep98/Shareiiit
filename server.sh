git pull
sudo cp -r frontend/build/* /var/www/share.osa.iiitd.edu.in/
cd backend
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
cd ..
sudo cp -r backend/staticfiles/* /var/www/share.osa.iiitd.edu.in/static/
sudo systemctl restart share-iiitd.socket
sudo systemctl restart nginx