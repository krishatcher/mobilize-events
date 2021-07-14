export default interface IOrganization {
    id: number,
    name: string,
    slug: string,
    is_coordinated: boolean,
    is_independent: boolean,
    race_type: string,
    is_primary_campaign: boolean,
    state: string,
    district: string,
    candidate_name: string,
    event_feed_url: string,
    created_date: number,
    modified_date: number,
    org_type: string
}
