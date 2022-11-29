export interface ModelsResponse {
    id: number,
    name: string,
    description: string,
    indexes: JSON,
    models: JSON,
    formula: string,
    created_at: Date,
    updated_at: Date
}

export interface ModelsRequest {
    name: string,
    description: string,
    // indexes: JSON,
    // models: JSON,
    formula: string,
}

export const defaultProps = {
    id: 0,
    name: 'name',
    description: 'description'
};