// import express
const express = require("express");
// یک کتابخانه نود هست
const path = require("path");

// call express
const app = express();

// برای شناسایی فایلهای cssو js
// express.static(root, [options])

app.use("/client", express.static(path.resolve(__dirname, "client")));

app.get("/*", (req, res) => {
  // console.log(path.resolve("client", "flavio.txt"));
  // D:\vscode\javacourse\spa\client\flavio.txt
  // console.log(path.resolve("flavio.txt"));
  // D:\vscode\javacourse\spa\flavio.txt
  // console.log(path.resolve(__dirname, "client", "index.html"));
    // D:\vscode\javacourse\spa\client\index.txt
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
  // console.log(path.resolve("/client", "flavio.txt"));

});

app.listen(process.env.PORT || 5000, () => console.log("sever is running ..."));

// http://localhost:5000 یا http://127.0.0.1:5000
