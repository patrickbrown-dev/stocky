FROM python:3.10-alpine3.13

ENV PIP_NO_CACHE_DIR false

WORKDIR /stocky

COPY . .

RUN apk add git
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile

CMD ["python", "bot.py"]
