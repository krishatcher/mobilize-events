import { Component, ChangeEvent } from "react";
import EventDataService from "../services/event.service"
import IEventItem from "../types/EventItem";

type Props = {};

type State = {
    eventItems: Array<IEventItem>,
    currentEvent: IEventItem | null,
    currentIndex: number,
    searchZipCode: number | null,
    searchDistance: number
};

export default class EventsList extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.onChangeSearchZipCode = this.onChangeSearchZipCode.bind(this);
        this.onChangeSearchDistance = this.onChangeSearchDistance.bind(this);
        this.retrieveEvents = this.retrieveEvents.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveEvent = this.setActiveEvent.bind(this);
        this.searchZipAndDistance = this.searchZipAndDistance.bind(this);

        this.state = {
            eventItems: [],
            currentEvent: null,
            currentIndex: -1,
            searchZipCode: null,
            searchDistance: -1
        };
    }

    componentDidMount() {
        this.retrieveEvents();
    }

    onChangeSearchZipCode(e: ChangeEvent<HTMLInputElement>) {
        const searchZipCode = e.target.value;

        this.setState({
            searchZipCode: parseInt(searchZipCode)
        });
    }

    onChangeSearchDistance(e: ChangeEvent<HTMLSelectElement>) {
        const searchDistance = e.target.value;

        this.setState({
            searchDistance: parseInt(searchDistance)
        });
    }

    retrieveEvents() {
        EventDataService.getAll()
            .then(response => {
                this.setState({
                    eventItems: response.data.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveEvents();
        this.setState({
            currentEvent: null,
            currentIndex: -1
        });
    }

    setActiveEvent(eventItem: IEventItem, index: number) {
        this.setState({
            currentEvent: eventItem,
            currentIndex: index
        });
    }

    searchZipAndDistance() {
        if (this.state.searchZipCode && this.state.searchZipCode > 0 && this.state.searchDistance > 0) {
            this.setState({
                currentEvent: EventDataService.getEmptyEvent(),
                currentIndex: -1
            });

            EventDataService.findByDistance(this.state.searchZipCode, this.state.searchDistance)
                .then(response => {
                    this.setState({
                        eventItems: response.data.data
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            this.refreshList();
        }
    }

    render() {
        const { searchZipCode, searchDistance, eventItems, currentEvent, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group md-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter your 5 digit Zip Code"
                            max={99999}
                            value={searchZipCode ?? undefined}
                            onChange={this.onChangeSearchZipCode}
                        />
                        <select
                            className="form-control"
                            value={searchDistance}
                            onChange={this.onChangeSearchDistance}
                        >
                            <option value={-1}>Select a Distance</option>
                            <option value={10}>10 Miles</option>
                            <option value={25}>25 Miles</option>
                            <option value={50}>50 Miles</option>
                            <option value={75}>75 Miles</option>
                        </select>
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchZipAndDistance}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Events List</h4>

                    <ul className="list-group">
                        {eventItems &&
                        eventItems.map((tutorial: IEventItem, index: number) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveEvent(tutorial, index)}
                                key={index}
                            >
                                {tutorial.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6 eventDetail">
                    {(currentEvent && currentEvent.title !== "") ? (
                        <div>
                            {currentEvent.featured_image_url !== "" &&
                                <img src={currentEvent.featured_image_url} alt={"Event Feature Graphic"} />
                            }
                            <h4>{currentEvent.title}</h4>
                            <p>{currentEvent.description}</p>
                            <p><a href={currentEvent.browser_url} target={"_blank"} rel={"noreferrer"} ><strong>Register for a shift</strong></a> with our partner, Mobilize!</p>
                            {currentEvent.sponsor && currentEvent.sponsor.name !== "" &&
                                <p>Hosted by <strong>{currentEvent.sponsor.name}</strong></p>
                            }
                        </div>
                    ) : (
                        <div>
                            <h4>Event Detail</h4>
                            <br />
                            <p>Please click on an Event to see details here!</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
