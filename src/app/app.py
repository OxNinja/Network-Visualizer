#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from flask import Flask, render_template, redirect, request, send_from_directory, url_for

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["DEFAULT_FILE"] = "default sample"
app.config["UPLOADED_FILE"] = "uploaded file"


# Common functions
def reload(request):
    return redirect(request.url)


def redirect_root():
    return url_for("start")


def uploaded_file():
    if os.path.isfile("uploads/uploaded.xml"):
        return True
    else:
        return False


@app.route("/", methods=["GET", "POST"])
def start():
    if request.method == "GET":
        if uploaded_file():
            f_name = app.config["UPLOADED_FILE"]
        else:
            f_name = app.config["DEFAULT_FILE"]

        return render_template("index.html", file=f_name)

    elif request.method == "POST":
        # Check if file is in POST params
        if "file" not in request.files:
            return reload(request)

        f = request.files["file"]
        # Check if file is selected
        if f.filename == "":
            return reload(request)

        # Security checks on filename
        if f:  # and check_filename(f.filename)
            f.save(os.path.join(app.config["UPLOAD_FOLDER"], "uploaded.xml"))
            return reload(request)


@app.route("/uploaded")
def get_uploaded():
    return send_from_directory(app.config["UPLOAD_FOLDER"], "uploaded.xml")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
