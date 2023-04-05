import { getMovie } from "../functions/getMovie.js";
import getPictures from "../functions/getImages.js";
import getTrailer from "../functions/getTrailer.js";
import getMovieViaName from "../functions/getMovieViaName.js";
import getCast from "../functions/getCast.js";
import getSimilar from "../functions/getSimilar.js";
import getShowViaName from "../functions/getShowViaName.js";
import getShow from "../functions/getShow.js";

class Client {
  public static version?: "V.1";
  public async getMovie(id: string) {
    const results = await getMovie(id);
    return results;
  }
  public async getMovieViaName(query: string) {
    const results = await getMovieViaName(query);
    return results;
  }
  public async getPictures(id: string) {
    const results = await getPictures(id);
    return results;
  }
  public async getTrailer(id: string) {
    const result = await getTrailer(id);
    return result;
  }
  public async getShow(id: string) {
    const resultValue = await getShow(id);
    return resultValue;
  }
  public async getShowViaName(query: string) {
    const result = await getShowViaName(query);
    return result;
  }
  public async getCast(id: string) {
    const result = await getCast(id);
    return result;
  }
  public async getSimilar(id: string) {
    const result = await getSimilar(id);
    return result;
  }
}
export { Client };
