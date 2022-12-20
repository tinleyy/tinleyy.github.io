export interface IndexSensorsResponse {
    id: number,
    index_id: number,
    amount: number,
    created_at: Date,
    updated_at: Date,
    sensor_id: number
}

export interface MathResponse {
    highest: number,
    lowest: number,
    average: number
}

export interface ChartDataResponse {
    data: IndexSensorsResponse[],
    math: MathResponse
}

export interface IndexSensorsRequest {
    amount: number,
    index_id: number,
    sensor_id: number
}

export interface IndexSensorsEditRequest {
    amount: number,
    index_id: number,
    sensor_id: number,
    created_at: Date,
    updated_at: Date
}

interface Options {
    label: string,
    value: number
}

export interface IndexSensorsInput {
    amount: number,
    index_id: number,
    sensor_id: Options
}

export interface IndexSensorsEditModeInput {
    amount: number,
    index_id: number,
    sensor_id: Options,
    created_at: Date,
    updated_at: Date,
}