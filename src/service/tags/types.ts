export interface TagsResponse {
    id: number,
    name: string,
    description: string,
    created_at: Date,
    updated_at: Date
}

export interface TagsRequest {
    name: string,
    description: string,
}