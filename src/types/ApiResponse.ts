import IEventItem from "./EventItem";

export default interface IApiResponse {
    count: number,
    data: Array<IEventItem>,
    metadata: object,
    next: string,
    previous: string,
    results_limited_to: number
}
