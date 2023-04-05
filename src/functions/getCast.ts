import got from "got";
import cheerio from "cheerio";
import { ICast } from "../typings/index.js";
async function getCast(id: string) {
  const baseURL: string = `https://www.imdb.com/title/${id}`;
  const request = await got(baseURL);
  const page = request.body;
  const $ = cheerio.load(page);
  const data = $("script#__NEXT_DATA__").html() as string;
  const jsonData = JSON.parse(data);
  const array: ICast[] = [];

  jsonData.props.pageProps.mainColumnData.cast.edges.map((v: any) => {
    const value = v.node?.name?.nameText?.text;
    const image = v.node?.name?.primaryImage?.url;
    const id = v.node?.name?.id;
    array.push({
      name: value,
      id,
      url: image,
    });
  });
  return array;
}
export default getCast;
