home_page_template = """
<!DOCTYPE html>
<html>
  <head>
    <title>ZK Login</title>
    <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.10/dist/htmx.min.js" integrity="sha384-H5SrcfygHmAuTDZphMHqBJLc3FhssKjG7w/CeCpFReSfwBWDTKpkzPP8c+cLsK+V" crossorigin="anonymous"></script>
  </head>
  <body>

    <h1>Zero Knowledge Login</h1>
    <div class="login-options-container">
        <p>Do you have your keys already?</p>
        <div>
            <button class="test">Log In</button>
            <button hx-get="/signup" hx-swap="outerHTML" hx-target=".login-options-container">Sign up</button>
        </div>
    </div>
    <script src="/static/app.js"></script>
  </body>
</html>
""".encode("utf-8")
