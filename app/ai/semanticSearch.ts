import {documents, PortfolioDocument} from './documents';
import {calculateSimilarity} from './similarity';

export function semanticSearch(question: string): PortfolioDocument[] {
    const MINIMUM_SCORE = 20;
    const MAX_RESULTS = 5;

    const rankedDocuments = documents
            .map(doc => ({
                document: doc,
                score: calculateSimilarity(question, doc)
            }))
            .sort((a, b) => b.score - a.score);

/* console.log(
    rankedDocuments.map(item => ({
        title: item.document.title,
        score: item.score
    }))
); */

        return rankedDocuments
            .filter(item => item.score >= MINIMUM_SCORE)
            .slice(0, MAX_RESULTS)
            .map(item => item.document);

}