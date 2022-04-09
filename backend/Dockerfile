FROM python:3.8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
RUN apt update \
    && apt-get install libpq-dev gcc build-essential -y
COPY requirements.txt /backend/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY . /backend/