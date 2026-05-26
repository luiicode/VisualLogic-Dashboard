import { Status } from "@/features/teams/types/statusType";

export interface Member {
  name: string;
  email: string;
  role: string;
  activity: string;
  status: Status;
}
