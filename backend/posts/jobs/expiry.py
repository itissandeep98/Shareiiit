from datetime import datetime, time, timedelta
from posts.models import Post


def flag_expired_posts():
    time_threshold = datetime.now() - timedelta(days=60)
    unmarked_expired_posts = Post.objects.filter(
        is_expired=False, created_at__lte=time_threshold
    )

    for post in unmarked_expired_posts:
        post.is_expired = True
        post.save()