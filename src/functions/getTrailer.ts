import got from "got";
import cheerio from "cheerio";

async function getTrailer(id: string) {
  const baseURL: string = `https://www.imdb.com/title/${id}`;
  const request = await got(baseURL);
  const page = request.body;
  const $ = cheerio.load(page);
  const data = $("script#__NEXT_DATA__").html() as string;
  const jsonData = JSON.parse(data);
  const trailer =
    jsonData?.props?.pageProps?.aboveTheFoldData?.primaryVideos?.edges[0]?.node
      .playbackURLs[0]?.url;

  return trailer;
}
export default getTrailer;
