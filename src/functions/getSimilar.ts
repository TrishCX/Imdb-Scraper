import got from "got";
import cheerio from "cheerio";
import { ISimilar } from "../typings/index.js";

async function getSimilar(id: string) {
  const baseURL: string = `https://www.imdb.com/title/${id}`;
  const request = await got(baseURL);
  const page = request.body;
  const $ = cheerio.load(page);
  const data = $("script#__NEXT_DATA__").html() as string;
  const jsonData = JSON.parse(data);
  const array: ISimilar[] = [];
  jsonData.props.pageProps.mainColumnData.moreLikeThisTitles.edges.map(
    (v?: any) => {
      const title = v.node?.titleText?.text;
      const id = v?.node?.id;
      const imageURL = v?.node?.primaryImage?.url;
      array.push({
        id,
        imageURL,
        title,
      });
    }
  );
  return array;
}

export default getSimilar;
