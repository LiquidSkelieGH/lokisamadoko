export interface ErrorResponse {
    error: string;
    status: number;
    timestamp: string;
}

export interface WhereIsMessage {
    id: number;
    text: string;
    image: string;
}