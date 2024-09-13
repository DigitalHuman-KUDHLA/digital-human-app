import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import http from 'http';

const app = express();
const port = process.env.PORT || 5174;

let receivedData = {}; // Unityから受け取ったデータを保存するための変数

// JSONの解析を有効にする
app.use(bodyParser.json());

// CORSを有効にする
app.use(cors());

// HTTPサーバーを作成
const server = http.createServer(app);

// WebSocketサーバーをセットアップ
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
    console.log('WebSocket接続が確立されました');
    ws.send(JSON.stringify({ message: 'WebSocket接続が確立されました' }));
});

// UnityからのPOSTリクエストを受け取るエンドポイント
app.post('/api/receive-json', (req, res) => {
    receivedData = req.body; // 受け取ったデータを保存
    console.log('Received JSON from Unity:', receivedData);

    // WebSocketクライアントにデータを送信
    wss.clients.forEach(client => {
        if (client.readyState === WebSocketServer.OPEN) {
            client.send(JSON.stringify(receivedData));
        }
    });

    res.send({ status: 'success', message: 'JSON received successfully' });
});

// Reactがデータを取得するためのGETエンドポイント
app.get('/api/receive-json', (req, res) => {
    res.json(receivedData);
});

// サーバーを起動
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
