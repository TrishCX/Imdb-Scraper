import got from "got";
import cheerio from "cheerio";
import { ISearch } from "../typings/index.js";

async function getMovieViaName(query: string) {
  const baseURL: string = `https://www.imdb.com/find/?q=${query}&s=tt&ttype=ft`;
  const request = await got(baseURL);
  const page = request.body;
  const $ = cheerio.load(page);
  const arrayOfResults: ISearch[] = [];
  const data = $("script#__NEXT_DATA__").html() as string;
  const jsonData = JSON.parse(data);
  const searchPath = jsonData.props.pageProps.titleResults;
  for (const response of searchPath.results) {
    arrayOfResults.push({
      id: response?.id,
      poster: response?.titlePosterImageModel?.url,
      title: response?.titleNameText,
    });
  }
  return arrayOfResults;
}
export default getMovieViaName;
