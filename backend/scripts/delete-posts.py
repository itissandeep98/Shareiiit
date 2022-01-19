"""
Using the API, the posts are soft deleted by simply marking is_deleted field as true, this is done to prevent accidental loss of data.
Use this script to completely delete the posts.
"""


from posts.models import Post


def run(*args):
    Post.objects.filter(is_deleted=True).delete()
