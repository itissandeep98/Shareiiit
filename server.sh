git pull
sudo cp -r frontend/build/* /var/www/share.osa.iiitd.edu.in/
sudo systemctl restart share-iiitd.socket
sudo systemctl restart nginx