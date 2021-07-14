export default interface ILocation {
    venue: string,
    address_lines: Array<string>,
    locality: string,
    region: string,
    country: string,
    postal_code: string,
    location: {
        latitude: Float32Array,
        longitude: Float32Array
    },
    congressional_district: string,
    state_leg_district: string,
    state_senate_district: string
}
