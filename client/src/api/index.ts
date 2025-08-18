import type {SearchRequest, SearchResponse} from "@shared/types";

export const v2Search = async (request: SearchRequest): Promise<SearchResponse> => {
    const res = await fetch("http://localhost:3001/api/dehashed-search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            page: request.page,
            query: request.query,
            size: request.size,
            wildcard: request.wildcard,
            regex: request.regex,
            de_dupe: request.de_dupe,
        })
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    if (!json.success) {
        throw new Error('API request failed');
    }
    return json.data as SearchResponse;
};