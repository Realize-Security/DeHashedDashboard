import dotenv from 'dotenv';

// Load environment variables
dotenv.config({path: '../../.env'});

export function dehashedBaseUrl(): string {
    return process.env.DEHASHED_BASE_URL!
}

export function dehashedApiKeyName(): string {
    return process.env.DEHASHED_API_KEY_NAME!
}

export function dehashedApiKey(): string {
    return process.env.DEHASHED_API_KEY!
}

