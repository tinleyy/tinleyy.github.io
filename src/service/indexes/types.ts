export interface IndexesResponse {
    id: number,
    name: string,
    description: string,
    standard: number,
    low: number,
    middle: number,
    high: number,
    very_high: number,
    hidden: boolean,
    created_at: Date,
    updated_at: Date
}

export const defaultProps = {
    id: 0,
    name: 'name',
    description: 'description'
};