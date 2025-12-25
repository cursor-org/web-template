import { usePage } from '@inertiajs/react'
import { ReactNode, useEffect } from 'react'

// TODO: uncomment after GTM and GA are implemented
// import ReactGA from 'react-ga4'
// import TagManager from 'react-gtm-module'
// import { updateGTMDataLayer } from '~/entities/gtm/models/gtm.slice'
import { setActiveComponent } from '~/entities/page/models/common.slice'
import useGoToTop from '~/features/GoTopButton/model/goToTop'
import { COMPONENTS } from '~/shared/constants/pages'
import { useAppDispatch, usePrevious } from '~/shared/models/hooks/index'

// TODO: move to consts
const LANDING_COMPONENT = 'Landing'
const ENTRY_APP_PAGES = [
  COMPONENTS.App.login,
  COMPONENTS.App.registration,
  COMPONENTS.App.internalError,
  COMPONENTS.App.notFound,
]

const LANDING_EXCEPTION_PAGE = ['Landing/LandingAgents2']

const PageObserver = ({ children }: { children: ReactNode }) => {
  const { component } = usePage()
  const dispatch = useAppDispatch()
  // const profile = useAppSelector((state) => state.profile)
  const { goToTop } = useGoToTop()
  // // TODO: added for test
  // useEffect(() => {
  //   dispatch(
  //     updateGTMDataLayer({
  //       Email: profile.email,
  //       Location: component,
  //       Id: profile.id,
  //     })
  //   )
  //   TagManager.dataLayer({
  //     dataLayer: {
  //       Email: profile.email,
  //       Id: profile.id,
  //     },
  //   })
  // }, [component, dispatch, profile])

  const prevComp = usePrevious(component)

  useEffect(() => {
    if (prevComp !== component) {
      goToTop('instant')
    }
  }, [component, goToTop, prevComp])

  useEffect(() => {
    // ReactGA.send({ hitType: 'pageview', page: window.location.pathname })

    const isLanding =
      component.indexOf(LANDING_COMPONENT) !== -1 &&
      !!LANDING_EXCEPTION_PAGE.find((elem) => component.indexOf(elem) === -1)
    const isEntryAppPage = !!ENTRY_APP_PAGES.find((entryPage) => entryPage === component)

    dispatch(
      setActiveComponent({
        isLanding,
        isEntryAppPage,
        page: component,
      })
    )
  }, [component, dispatch])
  return children
}

export default PageObserver
