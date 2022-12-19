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

export interface Indexes {
    formula_id: number,
    index_id: number,
    index_name: string
}

export interface Models {
    formula_id: number,
    model_id: number,
    model_name: string
}

export interface ModelsRequest {
    name: string,
    description: string,
    indexes: [],
    models: [],
    formula: string,
}

export const defaultProps = {
    id: 0,
    name: 'name',
    description: 'description'
};