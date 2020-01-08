#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from flask import Flask, render_template, redirect, request, url_for

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads"

# Common functions
def reload(request):
    return redirect(request.url)

def redirect_root():
    return url_for("start")

@app.route("/", methods = ["GET", "POST"])
def start():
    if request.method == "GET":
        return render_template("index.html")
    elif request.method == "POST":
        # Check if file is in POST params
        if "file" not in request.files:
            return reload(request)
        f = request.files["file"]
        
        # Check if file is selected
        if f.filename == "":
            return reload(request)

        # Security checks on filename
        if f: # and check_filename(f.filename)
            f.save(os.path.join(app.config["UPLOAD_FOLDER"], "uploaded.xml"))
            return reload(request)

if __name__ == "__main__":
    app.run(debug = True)
