git pull
sudo cp -r frontend/build/* /var/www/share.fh.iiitd.edu.in/
source backend/venv/bin/activate
pip install -r backend/requirements.txt
python backend/manage.py makemigrations
python backend/manage.py migrate
python backend/manage.py collectstatic --noinput
sudo cp -r backend/staticfiles/* /var/www/share.fh.iiitd.edu.in/static/
sudo systemctl restart share-iiit.socket
sudo systemctl restart nginx