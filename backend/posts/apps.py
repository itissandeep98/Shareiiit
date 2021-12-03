from django.apps import AppConfig


class PostsConfig(AppConfig):
    name = "posts"

    def ready(self):
        import posts.signals

        from posts.expiry import updater

        # updater.start()