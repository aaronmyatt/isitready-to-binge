type scrapeResponse = {
    data: {
        results: {
            text: string;
            element: string;
        }[];
    }[];
};

const API_URL = "https://api.jigsawstack.com/v1/ai/scrape";
const PROMPTS = [
    "next episode",
];

export default async function isItDoneYet({ url }: { url: string }) {
    const response = await fetch(
        API_URL,
        {
            method: "POST",
            body: JSON.stringify({
                url,
                element_prompts: PROMPTS,
            }),
            headers: {
                "x-api-key": Deno.env.get("JIGSAW_API_KEY") as string,
                "Content-Type": "application/json",
            },
        },
    );

    try {
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const results = await response.json() as scrapeResponse;
        const data = results.data;
        const moreEpisodesToGo = data.filter((d) =>
            d.results.find((r) => r.text.toLowerCase().includes(PROMPTS[0]))
        );

        return moreEpisodesToGo.length === 0;
    } catch (e) {
        console.error(e.message);
        console.error(await response.text());
    }
}
