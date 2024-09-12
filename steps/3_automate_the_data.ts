import "jsr:@std/dotenv/load";
import isItDoneYet from "../isitdoneyet.ts";

// cron to run every day at noon
`"0 0 12 * * * deno run -A $HOME/isitdoneyet.ts"`; // every day at noon


// Serve the app
Deno.serve(async (_req) => {
    const done = await isItDoneYet({
        url: "https://www.imdb.com/title/tt30446769/episodes",
    });
    return new Response(done ? "It's done! Binge Time" : "It's not done yet!");
});
