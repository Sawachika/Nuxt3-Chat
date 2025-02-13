import { http, HttpResponse } from 'msw'

export default [
  http.post('/v2/auth/sms/send', () => HttpResponse.json({
    meta: {
      status: 200
    },
    data: {
      otp_length: 6,
      sms_sent: true
    }
  })),
  http.post('/v2/auth/sms/validate', () => HttpResponse.json({
    meta: {
      status: 200
    },
    data: {
      refresh_token: 'xxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxx',
      validated: true
    },
  })),
  http.post('/v2/auth/logout', () => HttpResponse.json({
    meta: {
      status: 200
    },
    data: {},
  })),
]