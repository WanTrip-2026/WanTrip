import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faCircleNotch,
  faChevronRight,
  faChevronLeft,
  faSearch,
  faUser,
  faEnvelope,
  faStar,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

library.add(faCircleNotch, faChevronRight, faChevronLeft, faSearch, faUser, faEnvelope, faStar, faTimes, faGithub)

export { FontAwesomeIcon }
