export interface IndexesResponse {
    id: number,
    name: string,
    description: string,
    standard: number,
    low: number,
    middle: number,
    high: number,
    very_high: number,
    unit: string,
    hidden: boolean,
    created_at: Date,
    updated_at: Date
}

export interface IndexesRequest {
    name: string,
    description: string,
    standard: number,
    low: number,
    middle: number,
    high: number,
    very_high: number,
    unit: string,
    hidden: boolean
}

export const defaultProps = {
    id: 0,
    name: 'name',
    description: 'description'
};