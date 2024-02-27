const mysql = require('mysql');
const express = require('express');

// 创建连接
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '123456',
  database : 'persons'
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('错误连接: ' + err.stack);
    return;
  }
  console.log('数据库连接成功');
});

// 创建 express 应用
const app = express();

// 创建路由
app.get('/list', (req, res) => {
  connection.query('SELECT * FROM persons', (err, rows) => {
    if(err) {
      res.status(500).json({"status_code": 500,"status_message": "internal server error"});
    } else {
      res.json({
        "status_code": 200,
        "result": rows,
        "status_message": "user retrieved successfully"
      })
    }
  })
});

// 启动服务，监听8080端口
app.listen(8080, () => {
  console.log(`Server is running at http://localhost:8080`);
});