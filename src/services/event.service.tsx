import http from "../http-common";
import IApiResponse from "../types/ApiResponse";
import IContact from "../types/Contact";
import ICampaign from "../types/Campaign";
import ILocation from "../types/Location";
import IOrganization from "../types/Organization";
import ITag from "../types/Tag";
import ITimeslot from "../types/Timeslot";
import IEventItem from "../types/EventItem";

const baseUrl: string = "https://api.mobilize.us/v1";

class EventDataService {
    getAll() {
        return http.get<IApiResponse>(baseUrl + "/organizations/1/events?timeslot_start=gte_now&exclude_full=true");
    }

    get(id: string) {
        return http.get<IApiResponse>(baseUrl + `/events/${id}`);
    }

    findByDistance(zipCode: number, distance: number) {
        return http.get<IApiResponse>(baseUrl + `/organizations/1/events?timeslot_start=gte_now&exclude_full=true&max_dist=${distance}&zipcode=${zipCode}`);
    }

    getEmptyEvent() {
        let contact: IContact = {email_address: "", name: "", owner_user_id: 0, phone_number: ""};
        let eventCampaign: ICampaign = {event_create_page_url: "", id: 0, slug: ""};
        let location: ILocation = {address_lines: ["", ""], congressional_district: "", country: "", locality: "", location: {latitude: new Float32Array(2), longitude: new Float32Array(4)}, postal_code: "", region: "", state_leg_district: "", state_senate_district: "", venue: ""};
        let sponsor: IOrganization = {candidate_name: "", created_date: 0, district: "", event_feed_url: "", id: 0, is_coordinated: false, is_independent: false, is_primary_campaign: false, modified_date: 0, name: "", org_type: "", race_type: "", slug: "", state: ""};
        let tag: ITag = {id: 0, name: ""};
        let timeslot: ITimeslot = {end_date: 0, id: 0, instructions: "", is_full: false, max_attendees: 0, start_date: 0};

        let result: IEventItem;
        result = {
            accessibility_notes: "",
            accessibility_status: "",
            address_visibility: "",
            approval_status: "",
            browser_url: "",
            contact: contact,
            created_by_volunteer_host: false,
            created_date: 0,
            description: "",
            event_campaign: eventCampaign,
            event_type: "",
            featured_image_url: "",
            high_priority: false,
            id: 0,
            instructions: "",
            is_virtual: false,
            location: location,
            modified_date: 0,
            sponsor: sponsor,
            tags: [tag],
            timeslots: [timeslot],
            timezone: "",
            title: "",
            virtual_action_url: "",
            visibility: ""
        };

        return result;
    }
}

export default new EventDataService();
