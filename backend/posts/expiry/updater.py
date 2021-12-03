from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from posts.expiry import flag_expired


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(flag_expired.flag_expired_posts, "interval", minutes=5)
    scheduler.start()