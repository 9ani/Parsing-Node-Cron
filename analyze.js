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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalysisData = exports.analyzeData = void 0;
// analyze.ts
const parser_1 = require("./parser");
const previousPublications = [];
let analysisData = {
    totalPublications: 0,
    avgPrice: 0,
};
const analyzeData = () => __awaiter(void 0, void 0, void 0, function* () {
    const newPublications = yield (0, parser_1.fetchData)();
    const addedPublications = newPublications.filter(newPub => !previousPublications.some(prevPub => prevPub.title === newPub.title));
    previousPublications.push(...addedPublications);
    const totalPublications = previousPublications.length;
    const totalPrices = previousPublications.reduce((acc, curr) => acc + curr.price, 0);
    const avgPrice = totalPublications > 0 ? totalPrices / totalPublications : 0;
    analysisData = {
        totalPublications,
        avgPrice,
    };
    console.log(`Total new publications in the last fetch: ${addedPublications.length}`);
    console.log(`Average price of all publications: ${avgPrice.toFixed(2)} тг.`);
});
exports.analyzeData = analyzeData;
const getAnalysisData = () => analysisData;
exports.getAnalysisData = getAnalysisData;
