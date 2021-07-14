import ICampaign from "./Campaign";
import IContact from "./Contact";
import ILocation from "./Location";
import IOrganization from "./Organization";
import ITag from "./Tag";
import ITimeslot from "./Timeslot";

export default interface IEventItem {
    id: number,
    title: string,
    description: string,
    featured_image_url: string,
    high_priority: boolean,
    sponsor: IOrganization,
    timeslots: Array<ITimeslot>,
    location: ILocation,
    timezone: string,
    event_type: string,
    browser_url: string,
    created_date: number,
    modified_date: number,
    visibility: string,
    address_visibility: string,
    created_by_volunteer_host: boolean,
    is_virtual: boolean,
    virtual_action_url: string,
    contact: IContact,
    accessibility_status: string,
    accessibility_notes: string,
    tags: Array<ITag>,
    approval_status: string,
    event_campaign: ICampaign,
    instructions: string
}
