import type { SearchRequest, SearchResponse } from "@shared/types";
import { dehashedBaseUrl, dehashedApiKeyName, dehashedApiKey } from "@shared/config";

export const v2Search = async (request: SearchRequest): Promise<SearchResponse> => {
    const res = await fetch(dehashedBaseUrl()+"/v2/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            [`${dehashedApiKeyName()}`]: dehashedApiKey(),
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

    return await res.json() as SearchResponse;
};