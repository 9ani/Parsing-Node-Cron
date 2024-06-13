"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
// parser.ts
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = 'https://www.olx.kz/elektronika/tehnika-dlya-kuhni/holodilniki/';
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: true, // Set to true for running in production
    });
    const page = yield browser.newPage();
    yield page.goto(url);
    const publications = yield page.evaluate(() => {
        var _a;
        const titles = Array.from(document.querySelectorAll('.css-z3gu2d'), el => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ''; });
        const prices = Array.from(document.querySelectorAll('.css-tyui9s.er34gjf0'), el => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ''; });
        const publications = [];
        for (let i = 0; i < titles.length; i++) {
            const title = titles[i];
            const price = parseFloat(((_a = prices[i]) === null || _a === void 0 ? void 0 : _a.replace(/[^\d]/g, '')) || '0'); // Extract number from price text
            publications.push({ title, price });
        }
        return publications;
    });
    yield browser.close();
    return publications;
});
exports.fetchData = fetchData;
