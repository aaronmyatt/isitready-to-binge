import "jsr:@std/dotenv/load";

type scrapeResponse = {
    data: {
        results: {
            text: string;
            element: string;
        }[];
    }[];
};

const response = await fetch(
    "https://api.jigsawstack.com/v1/ai/scrape",
    {
        method: "POST",
        body: JSON.stringify({
            url: "https://www.imdb.com/title/tt30446769/episodes",
            element_prompts: [
                "next episode",
            ],
        }),
        headers: {
            "x-api-key": Deno.env.get("JIGSAW_API_KEY") as string,
            "Content-Type": "application/json",
        },
    },
);

const results = await response.json() as scrapeResponse;
const data = results.data;

console.log(data);

const moreEpisodesToGo = data.filter((d) =>
    d.results.find((r) => r.text.toLowerCase().includes("next episode"))
);

console.log(moreEpisodesToGo.length === 0);
