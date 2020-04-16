import { Logger } from "./logger";
import { Response } from "./response";

/**
 * Logger class
 */
export class CustomLogger extends Logger {
    /**
     * output/log given data
     * @param post request string used
     * @param r Response object
     * @param error error message or null
     * @return current Logger instance for method chaining
     */
    public log(post: string, r: Response, error: Error | null = null): CustomLogger {
        // apply here whatever you need e.g.
        console.log(post);
        console.dir(r.getCommand());
        if (error) {
            console.error(error.message);
        }
        console.log(r.getPlain());
        return this;
    }
}
