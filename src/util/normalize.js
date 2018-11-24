import moment from 'moment';
import uuidv5 from 'uuid/v5';
import logos from '../data/logos';

export function normalizeResponse(response) {
  return response.articles.map(article => ({
    id: uuidv5(article.url, uuidv5.URL),
    url: article.url,
    publisherName: article.source.name,
    title: article.title,
    image: article.urlToImage,
    publisherLogo: logos[article.source.id],
    text: article.content || article.description,
    date: moment(article.publishedAt).fromNow(),
  }));
}
