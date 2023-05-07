export interface Appointment {
  id: number
  date: Date;
  lieu: string;
  helper: {
    id: number;
    userName: string;
    role: string;
  }
  organization: {
    id: number;
    userName: string;
    role: string;
  }
}

export interface MonthlyScheduledAppointmentCount {
  year: number;
  month: number;
  count: number;
}

export interface Organization {
  id: number;
  userName: string;
  role: string;
}

export interface CreateAppointment {
  date: Date;
  lieu: string;
  helperId: number;
  organizationId: number;
}
