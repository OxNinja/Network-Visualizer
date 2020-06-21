FROM alpine:latest

LABEL   author="0xNinja" \
        repo="https://github.com/OxNinja/Network-Visualizer" \
        version="0.1"

RUN apk add python3 py3-pip py3-virtualenv

# Virtual env setup
ENV V_ENV=/opt/venv
RUN python3 -m virtualenv --python=/usr/bin/python3 $V_ENV
ENV PATH="$V_ENV/bin:$PATH"

# Setup workdir
RUN rm -rf /app/*
COPY ./requirements.txt /tmp/requirements.txt
WORKDIR /app
COPY ./app /app

# Upgrade pip + install dependencies
RUN pip3 install --upgrade pip
RUN pip3 install -r /tmp/requirements.txt

# Run app within virtual env
CMD ["python", "app.py"]

EXPOSE 5000
