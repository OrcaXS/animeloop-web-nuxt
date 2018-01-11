import fontawesome from '@fortawesome/fontawesome';
import {
  faThList,
  faTags,
  faQuestionCircle,
  faInfo,
  faArrowRight,
  faLanguage,
  faBars,
  faTimes,
  faSearch,
  faAngleDown,
} from '@fortawesome/fontawesome-free-solid';

fontawesome.config = {
  autoAddCss: false,
};

// eslint-disable-next-line max-len
fontawesome.library.add(faThList, faTags, faQuestionCircle, faInfo, faArrowRight, faLanguage, faBars, faTimes, faSearch, faAngleDown);
