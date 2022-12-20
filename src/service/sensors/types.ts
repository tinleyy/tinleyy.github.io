export interface SensorsResponse {
    id: number,
    latitude: number,
    longitude: number,
    distinct: string,
    remarks: string
    created_at: Date,
    updated_at: Date
}

export interface SensorsRequest {
    latitude: number,
    longitude: number,
    distinct: string,
    remarks: string
}

export const defaultProps = {
    id: 0,
    latitude: 0,
    longitude: 0
};