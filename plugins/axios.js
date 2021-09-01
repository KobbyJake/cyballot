// import fontawesome from '@fortawesome/fontawesome'
// import faSolid from '@fortawesome/fontawesome-free-solid'

export default function({ $axios, redirect, app }) {
  $axios.onResponse(response => {
    if (response.data.error) {
      app.$toast.error('<i class="fas fa-ban" /> ' + response.data.error, {
        theme: 'bubble'
      })
    }
    if (response.data.success) {
      app.$toast.success(
        '<i class="far fa-thumbs-up" /> ' + response.data.success
      )
    }
    if (response.data.info) {
      app.$toast.info(
        '<i class="fas fa-info-circle" /> ' + response.data.info,
        {
          theme: 'outline'
        }
      )
    }
    if (response.data.show) {
      app.$toast.show(response.data.show)
    }
    if (response.data.warning) {
      app.$toast.error('<i class="fas fa-bomb" /> ' + response.data.warning, {
        theme: 'bubble'
      })
      // redirect('/welcome')
    }
  })

  $axios.onError(error => {
    if (error.response.data.authError) {
      app.$auth.logout()
    }
    // app.$toast.error(error.response.data.error)
  })
}
