import {documents, PortfolioDocument} from './documents';
import {calculateSimilarity} from './similarity';

export function semanticSearch(question: string): PortfolioDocument | null {
    const  rankedDocument = documents.map(doc => ({
        document: doc,
        score: calculateSimilarity(question, doc)
    })).sort((a, b) => b.score - a.score);

  if( rankedDocument.length === 0 || rankedDocument[0].score === 0) {
    return null;
  }

 return rankedDocument[0].document;
}