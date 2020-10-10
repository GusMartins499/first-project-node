import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppintmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppoint = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppoint || null;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppintmentsRepository;
