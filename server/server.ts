import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {SearchRequest, SearchResponse} from "@shared/types";
import * as z from 'zod';
import {v2Search} from "./dehashed";

dotenv.config({path: '../.env'});

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
});

// SearchSchema zod validation for search request POST body
const SearchSchema = z.object({
    query: z.string().min(1, 'Search query cannot be empty'),
    page: z.number().int().positive().optional().default(1),
    size: z.number().int().positive().optional().default(10),
    regex: z.boolean().optional().default(false),
    wildcard: z.boolean().optional().default(false),
    de_dupe: z.boolean().optional().default(false),
});

app.post('/api/dehashed-search', async (req: Request, res: Response) => {
    try {
        const searchRequest: SearchRequest = SearchSchema.parse(req.body);
        const apiResponse: SearchResponse = await v2Search(searchRequest);
        res.status(200).json({ success: true, data: apiResponse });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues.map((e: z.core.$ZodIssueBase) => ({ field: e.path.join('.'), message: e.message })),
            });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});