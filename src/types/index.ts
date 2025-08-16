// SearchRequest defines the structure of a search request to POST /v2/search
// Regex and wildcard cannot be used in conjunction.
export interface SearchRequest {
    query: string;
    page?: number;
    size?: number;
    regex?: boolean;
    wildcard?: boolean;
    de_dupe?: boolean;
}

// SearchResponse defines the structure of results from searches to POST /v2/search
export interface SearchResponse {
    balance: number;
    entries: searchResponseEntries[];
    took: string;
    total: number;
}

// searchResponseEntries defines the structure of SearchResponse.entries
interface searchResponseEntries {
    id: string;
    email: string[];
    ip_address: string[];
    username: string[];
    password: string[];
    hashed_password: string[];
    name: string[];
    dob: string[];
    license_plate: string[];
    address: string[];
    phone: string[];
    company: string[];
    url: string[];
    social: string[];
    cryptocurrency_address: string[];
    database_name: string[];
    raw_record: rawRecord;
}

// rawRecord defines the structure of searchResponseEntries.raw_record
interface rawRecord {
    le_only: boolean;
    unstructured: boolean;
}