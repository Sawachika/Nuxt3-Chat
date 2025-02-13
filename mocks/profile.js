import { http, HttpResponse } from 'msw'

export default [
  http.get('/v2/profile', () => HttpResponse.json({
    meta: {
      status: 0
    },
    data: {
      account: {
        account_email: 'user1@email.co.jp',
        account_phone_number: '+81 12345678',
        is_email_verified: true
      },
      boost: {
        allotment: 0,
        allotment_remaining: 0,
        allotment_used: 0,
        boost_refresh_amount: 0,
        boost_refresh_interval: 0,
        boost_refresh_interval_unit: 'string',
        duration: 0,
        internal_remaining: 0,
        purchased_remaining: 0,
        purchases: [
          'string'
        ],
        remaining: 0
      },
      email_settings: {
        email: 'user1@email.co.jp',
        email_settings: {
          messages: true,
          new_matches: true,
          promotions: true
        }
      },
      instagram: {
        completed_initial_fetch: true,
        last_fetch_time: '2019-05-03T0:1:45.294Z',
        media_count: 3,
        photos: [
          {
            image: 'http://scontent.cdninstagram.com/vp/5f5e8001749550bb702181d112a5d639/5D55F4FB/t51.2885-15/sh0.08/e35/s640x640/42003230_1114422282064991_2010755630876063954_n.jpg?_nc_ht=scontent.cdninstagram.com',
            link: 'http://www.instagram.com/p/Boc7eYOBYym/',
            thumbnail: 'http://scontent.cdninstagram.com/vp/6b977f064a06e51276af1f81d6eedc17/5D5FAC7E/t51.2885-15/e35/s150x150/42003230_1114422282064991_2010755630876063954_n.jpg?_nc_ht=scontent.cdninstagram.com',
            ts: '1538529027'
          }
        ]
      },
      likes: {
        likes_remaining: 0
      },
      notifications: [
        {}
      ],
      plus_control: {
        blend: 'optimal',
        discoverable_party: 'everyone',
        hide_ads: true,
        hide_age: false,
        hide_distance: false
      },
      products: {},
      purchase: {
        purchases: [
          {
            email: 'string',
            expire_date: 1559532920250,
            platform: 'android_store',
            product_id: 'plus_subscription_499_1m_3v',
            product_type: 'plus',
            purchase_type: 'subscription',
            terms: 1
          }
        ],
        subscription_expired: true
      },
      spotify: {
        spotify_connected: true
      },
      super_likes: {
        alc_remaining: 0,
        allotment: 0,
        new_alc_remaining: 0,
        remaining: 0,
        resets_at: 'string',
        superlike_refresh_amount: 0,
        superlike_refresh_interval: 0,
        superlike_refresh_interval_unit: 'string'
      },
      tinder_u: {
        status: 'string'
      },
      travel: {
        is_traveling: true
      },
      tutorials: [
        'string'
      ],
      user: {
        age_filter_max: 0,
        age_filter_min: 0,
        autoplay_video: true,
        birth_date: '1990/01/01',
        create_date: '2025/01/01',
        crm_id: 'string',
        discoverable: true,
        distance_filter: 0,
        gender: 0,
        gender_filter: 0,
        interested_in: [
          0
        ],
        interests: [
          {
            id: '1',
            name: 'Travel'
          }
        ],
        jobs: [
          {}
        ],
        name: 'User1',
        phone_id: 'string',
        photo_optimizer_enabled: true,
        photo_tagging_enabled: true,
        photos: [
          {
            crop_info: {
              processed_by_bullseye: true,
              user_customized: true
            },
            fbId: 'string',
            id: 'string',
            processedFiles: [
              {
                url: 'string',
                width: 0,
                height: 0
              }
            ],
            url: 'string'
          }
        ],
        photos_processing: true,
        ping_time: 'string',
        pos: {
          lat: 0,
          lon: 0
        },
        schools: [
          {}
        ],
        show_gender_on_profile: true,
        snapchat_connected: true,
        top_picks_discoverable: true,
        _id: 'string'
      }
    },
  })),
]