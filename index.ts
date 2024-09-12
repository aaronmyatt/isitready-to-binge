/* 
    Is it done yet?
    A protest against the trend of streaming services regressing towards their T.V. network predecessors.
*/

import "jsr:@std/dotenv/load";
import isItDoneYet from "./isitdoneyet.ts";

if (Deno.args.length !== 1) {
    console.error("Please provide a URL to check");
    Deno.exit(1);
}

// Example urls:
// An ongoing Korean drama: https://www.imdb.com/title/tt30446769/episodes
// An anime that finished:  https://www.imdb.com/title/tt21975436/episodes

const done = await isItDoneYet({
    url: Deno.args[0],
});

console.log(done ? "It's done! Binge Time" : "It's not done yet!");
