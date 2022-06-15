import { TeamMembers } from "./team-members"

export interface Team {
    _id: String
    name: String,
    country: String,
    date: Date,
    distance: Number,
    teamMembers: Array<TeamMembers>
}
