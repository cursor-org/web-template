import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button } from '~/shared/ui/button'

import useGoToTop from '../model/goToTop'

const GoToTopButton = () => {
  const { goToTop } = useGoToTop()
  return (
    <Button
      variant="default"
      className="h-[45px] w-[45px] p-0 bottom-[20px] left-5 fixed hover:text-primary border-2 flex items-center rounded-lg border-primary text-white z-20"
      onClick={() => goToTop()}
    >
      <FontAwesomeIcon icon={faChevronUp} width={20} height={20} />
    </Button>
  )
}

export default GoToTopButton
