export interface ModelsResponse {
    id: number,
    name: string,
    description: string,
    indexes: JSON,
    models: JSON,
    formula: Text,
    created_at: Date,
    updated_at: Date
}

export interface ModelsRequest {
    name: string,
    description: string,
    indexes: JSON,
    models: JSON,
    formula: Text,
}