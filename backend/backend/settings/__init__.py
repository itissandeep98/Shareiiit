from .base import *

# you need to set "myproject = 'prod'" as an environment variable
# in your OS (on which your website is hosted)
if os.getenv("DJANGO_DEV")=='true':
    from .dev import *
else:
    from .prod import *
