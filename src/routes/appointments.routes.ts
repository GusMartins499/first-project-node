import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appintmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppoinmentsInSameDate = appintmentsRepository.findByDate(
    parsedDate,
  );
  if (findAppoinmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already bocked' });
  }

  const appointment = appintmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
