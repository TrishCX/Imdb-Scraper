import got from "got";
import cheerio from "cheerio";
import { IPictures } from "../typings/index.js";

async function getPictures(id: string) {
  const baseURL: string = `https://www.imdb.com/title/${id}/mediaindex`;
  const request = await got(baseURL);
  const page = request.body;
  const $ = cheerio.load(page);
  const data = $("head")
    .find("script[type='application/ld+json']")
    .html() as string;
  const array: IPictures[] = [];

  const scriptData = JSON.parse(data);
  for (const results of scriptData.image) {
    array.push({
      caption: results?.caption || undefined,
      url: results?.url,
    });
  }
  return array;
}
export default getPictures;
