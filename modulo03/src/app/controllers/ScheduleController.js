import { startOfDay, endOfDay, parseISO } from 'date-fns'
import { Op } from 'sequelize'

import User from '../models/User';
import Appointment from '../models/Appointment'

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    })

    if (!checkUserProvider) {
      return res.status(401).json({
        error: 'User is not a provider'
      })
    }

    const { date } = req.query
    const parsedDate = parseISO(date)

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
        }
      },
      order: ['date']
    })

    return res.json(appointments)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { provider_id, date } = req.body

    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true }
    })

    if (!checkIsProvider) {
      return res.status(401).json({
        error: 'You can only create appointments whit providers'
      })
    }

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date))
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({
        error: 'Past dates are not permitted'
      })
    }

    /**
     * Check date availability
     */
    const checkAvailabity = Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    })

    if (checkAvailabity) {
      return res.status(400).json({
        error: 'Appointment date is not available'
      })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    })

    return res.json(appointment)
  }
}

export default new ScheduleController()
