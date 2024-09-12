import "jsr:@std/dotenv/load";

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

console.log(await response.json());
