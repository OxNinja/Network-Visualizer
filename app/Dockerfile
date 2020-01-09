FROM ubuntu:16.04

LABEL   author="0xNinja" \
        repo="https://github.com/OxNinja/Network-Visualizer" \
        version="0.1"

RUN apt-get update -y && apt-get install -y python3-pip

RUN rm -rf /app/*

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install --upgrade pip

RUN pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT ["python3"]

CMD ["app.py"]

EXPOSE 5000
