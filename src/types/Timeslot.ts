export default interface ITimeslot {
    id: number,
    start_date: number,
    end_date: number,
    max_attendees: number,
    is_full: boolean,
    instructions: string
}
