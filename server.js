"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const analyze_1 = require("./analyze");
require("./cron"); // Import cron to start the job
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    const data = (0, analyze_1.getAnalysisData)();
    res.send(`
    <h1>Analysis Data</h1>
    <p>Total Publications: ${data.totalPublications}</p>
    <p>Average Price: ${data.avgPrice.toFixed(2)} тг.</p>
    <p>Also check console</p>
  `);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    (0, analyze_1.analyzeData)();
});
