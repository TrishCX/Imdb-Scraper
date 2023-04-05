import got from "got";
import cheerio from "cheerio";
import { intToString, getReleaseDate } from "../common/index.js";
import { DateObject } from "../common/getReleaseDate.js";
import { IShow } from "../typings/index.js";

async function getShow(id: string) {
  const baseURL: string = `https://www.imdb.com/title/${id}`;
  const request = await got(baseURL);
  const page = request.body;
  const $ = cheerio.load(page);
  const data = $("script#__NEXT_DATA__").html() as string;
  const jsonData = JSON.parse(data);
  const mainData: any = jsonData.props.pageProps.mainColumnData;
  const endYear =
    jsonData.props.pageProps.aboveTheFoldData?.releaseYear?.endYear;
  const title =
    jsonData.props.pageProps.aboveTheFoldData.originalTitleText.text;
  const description =
    jsonData.props.pageProps.aboveTheFoldData.plot.plotText.plainText;
  const releaseDateObject = jsonData.props.pageProps.aboveTheFoldData
    .releaseDate as DateObject;
  const releaseDate = getReleaseDate(releaseDateObject);
  const runtime =
    jsonData.props.pageProps.aboveTheFoldData.runtime.displayableProperty.value
      .plainText;
  const IMDB_RATING =
    jsonData.props.pageProps.aboveTheFoldData.ratingsSummary.aggregateRating;
  const popularity =
    jsonData?.props?.pageProps?.aboveTheFoldData?.meterRanking?.currentRank ||
    0;
  const popularityRanking = intToString(popularity);
  const genres: any[] = [];
  jsonData.props.pageProps.aboveTheFoldData.genres.genres.map((g: any) =>
    genres.push(g.text)
  );
  const reviews = intToString(
    jsonData?.props?.pageProps?.aboveTheFoldData?.reviews?.total
  );
  const imageURL =
    jsonData?.props?.pageProps?.aboveTheFoldData.primaryImage.url;
  const returnObject: IShow = {
    title,
    imageURL,
    description,
    aired: releaseDate,
    end: endYear,
    duration: runtime,
    episodes: mainData?.episodes?.episodes?.total,
    seasons: mainData?.episodes?.seasons?.length,
    imdbRating: IMDB_RATING,
    popularity: popularityRanking,
    genres,
    reviews,
  };
  return returnObject;
}
export default getShow;
