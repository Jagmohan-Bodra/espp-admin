import React from 'react';
import svg from './svg';
import Icon from '@ant-design/icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faLock,
  faFolderOpen,
  faPenSquare,
  faBell,
  faCommentDots,
  faCopy,
  faFileAlt,
  faBook,
  faBars,
  faTh,
  faChalkboardTeacher,
  faGraduationCap,
  faUserCheck,
  faWallet,
  faCommentAlt,
  faBookOpen,
  faCalendarAlt,
  faShieldAlt,
  faUsers,
  faCog,
  faDownload,
  faUpload,
  faUserAlt,
  faClock,
  faCheck,
  faTimes,
  faCircle,
  faEnvelope,
  faEnvelopeOpen,
  faTrash,
  faSignOutAlt,
  faFolder,
  faEye,
  faGifts,
  faSort,
  faSortUp,
  faSortDown,
  faPaperPlane,
  faTrashRestore,
  faEdit,
  faPlus,
  faSave,
  faCrop,
  faArrowUp,
  faArrowDown,
  faCogs,
  faArchive,
} from '@fortawesome/free-solid-svg-icons';

//logo
export const LogoIcon = (props) => <Icon component={svg.logoIcon} {...props} />;

//crop
export const CropIcon = (props) => <FontAwesomeIcon icon={faCrop} {...props} />;
//sort
export const SortIcon = (props) => <FontAwesomeIcon icon={faSort} {...props} />;
export const SortUpIcon = (props) => (
  <FontAwesomeIcon icon={faSortUp} {...props} />
);
export const SortDownIcon = (props) => (
  <FontAwesomeIcon icon={faSortDown} {...props} />
);

export const UpArrowIcon = (props) => (
  <FontAwesomeIcon icon={faArrowUp} {...props} />
);
export const DownArrowIcon = (props) => (
  <FontAwesomeIcon icon={faArrowDown} {...props} />
);

//Envelope
export const EnvelopeIcon = (props) => (
  <FontAwesomeIcon icon={faEnvelope} {...props} />
);
export const EnvelopeOpenIcon = (props) => (
  <FontAwesomeIcon icon={faEnvelopeOpen} {...props} />
);

//Bin
export const TrashIcon = (props) => (
  <FontAwesomeIcon icon={faTrash} {...props} />
);
export const TrashRestoreIcon = (props) => (
  <FontAwesomeIcon icon={faTrashRestore} {...props} />
);

//
export const ArrowRightIcon = (props) => (
  <Icon component={svg.arrowRightIcon} {...props} />
);
export const ArrowDownIcon = (props) => (
  <Icon component={svg.arrowDownIcon} {...props} />
);

//menu
export const HomeIcon = (props) => <FontAwesomeIcon icon={faHome} {...props} />;
export const UserIcon = (props) => <FontAwesomeIcon icon={faUser} {...props} />;
export const PasswordIcon = (props) => (
  <FontAwesomeIcon icon={faLock} {...props} />
);
export const WorksheetsIcon = (props) => (
  <FontAwesomeIcon icon={faFolderOpen} {...props} />
);
export const SubmitAssignmentsIcon = (props) => (
  <FontAwesomeIcon icon={faPenSquare} {...props} />
);
export const NotificationsIcon = (props) => (
  <FontAwesomeIcon icon={faBell} {...props} />
);
export const DiscussionIcon = (props) => (
  <FontAwesomeIcon icon={faCommentDots} {...props} />
);
export const fileAltIcon = (props) => (
  <FontAwesomeIcon icon={faFileAlt} {...props} />
);
export const FolderIcon = (props) => (
  <FontAwesomeIcon icon={faFolder} {...props} />
);

export const GiftsIcon = (props) => (
  <FontAwesomeIcon icon={faGifts} {...props} />
);

// Parent
export const ClassDetailIcon = (props) => (
  <FontAwesomeIcon icon={faChalkboardTeacher} {...props} />
);
export const EnrollmentIcon = (props) => (
  <FontAwesomeIcon icon={faGraduationCap} {...props} />
);
export const ClassAttendanceIcon = (props) => (
  <FontAwesomeIcon icon={faUserCheck} {...props} />
);
export const PaymentIcon = (props) => (
  <FontAwesomeIcon icon={faWallet} {...props} />
);
export const FeedbackIcon = (props) => (
  <FontAwesomeIcon icon={faCommentAlt} {...props} />
);
export const CheckIcon = (props) => (
  <FontAwesomeIcon icon={faCheck} {...props} />
);
export const TimesIcon = (props) => (
  <FontAwesomeIcon icon={faTimes} {...props} />
);
export const CircleIcon = (props) => (
  <FontAwesomeIcon icon={faCircle} {...props} />
);

//Tutor
export const MaterialCourseIcon = (props) => (
  <FontAwesomeIcon icon={faBookOpen} {...props} />
);
export const ClassScheduleIcon = (props) => (
  <FontAwesomeIcon icon={faCalendarAlt} {...props} />
);
export const BankDetailsIcon = (props) => (
  <FontAwesomeIcon icon={faShieldAlt} {...props} />
);

///CMS
export const PagesIcon = (props) => (
  <FontAwesomeIcon icon={faCopy} {...props} />
);
export const PostsIcon = (props) => (
  <FontAwesomeIcon icon={faFileAlt} {...props} />
);
export const CategoryPostIcon = (props) => (
  <FontAwesomeIcon icon={faBook} {...props} />
);
export const MenuIcon = (props) => <FontAwesomeIcon icon={faBars} {...props} />;

export const BlocksIcon = (props) => <FontAwesomeIcon icon={faTh} {...props} />;
export const RoleIcon = (props) => (
  <FontAwesomeIcon icon={faUsers} {...props} />
);

export const SettingIcon = (props) => (
  <FontAwesomeIcon icon={faCog} {...props} />
);

//Button Icon Fontawesome
export const DownloadIcon = (props) => (
  <FontAwesomeIcon icon={faDownload} {...props} />
);

export const UploadIcon = (props) => (
  <FontAwesomeIcon icon={faUpload} {...props} />
);

export const BookOpenIcon = (props) => (
  <FontAwesomeIcon icon={faBookOpen} {...props} />
);

export const UserAltIcon = (props) => (
  <FontAwesomeIcon icon={faUserAlt} {...props} />
);

export const ClockIcon = (props) => (
  <FontAwesomeIcon icon={faClock} {...props} />
);

export const SignOutIcon = (props) => (
  <FontAwesomeIcon icon={faSignOutAlt} {...props} />
);

//card dashboard
export const CarRunningCardIcon = (props) => (
  <Icon component={svg.carRunningCardIcon} {...props} />
);
export const CarTimeCardIcon = (props) => (
  <Icon component={svg.carTimeCardIcon} {...props} />
);
export const LateStatusCardIcon = (props) => (
  <Icon component={svg.lateStatusCardIcon} {...props} />
);

//button
export const ButtonKanbanWhiteIcon = (props) => (
  <Icon component={svg.buttonKanbanWhiteIcon} {...props} />
);
export const ButtonKanbanBlueIcon = (props) => (
  <Icon component={svg.buttonKanbanBlueIcon} {...props} />
);

export const ButtonListWhiteIcon = (props) => (
  <Icon component={svg.buttonListWhiteIcon} {...props} />
);
export const ButtonListBlueIcon = (props) => (
  <Icon component={svg.buttonListBlueIcon} {...props} />
);

export const ButtonCalendarWhiteIcon = (props) => (
  <Icon component={svg.buttonCalendarWhiteIcon} {...props} />
);
export const ButtonCalendarBlueIcon = (props) => (
  <Icon component={svg.buttonCalendarBlueIcon} {...props} />
);

export const ButtonUserIcon = (props) => (
  <Icon component={svg.buttonUserIcon(props)} {...props} />
);

export const ButtonImportIcon = (props) => (
  <Icon component={svg.buttonImportIcon} {...props} />
);
export const ButtonCreateIcon = (props) => (
  <Icon component={svg.buttonCreateIcon} {...props} />
);
export const ButtonViewIcon = (props) => (
  <Icon component={svg.buttonViewIcon} {...props} />
);
export const ButtonEditIcon = (props) => (
  <Icon component={svg.buttonEditIcon} {...props} />
);
export const ButtonDeleteIcon = (props) => (
  <Icon component={svg.buttonDeleteIcon} {...props} />
);

export const ButtonEyesIcon = (props) => (
  <FontAwesomeIcon icon={faEye} {...props} />
);

export const SendIcon = (props) => (
  <FontAwesomeIcon icon={faPaperPlane} {...props} />
);

//input
export const InputPhoneIcon = (props) => (
  <Icon component={svg.inputPhoneIcon} {...props} />
);

export const InputLockIcon = (props) => (
  <Icon component={svg.inputLockIcon} {...props} />
);

export const InputUserIcon = (props) => (
  <Icon component={svg.userMenuIcon} {...props} />
);

//Other
export const FilterBlueIcon = (props) => (
  <Icon component={svg.filterBlueIcon} {...props} />
);
export const FilterWhiteIcon = (props) => (
  <Icon component={svg.filterWhiteIcon(props)} {...props} />
);
export const SuccessCheckIcon = (props) => (
  <Icon component={svg.successCheckIcon} {...props} />
);

//cell
export const CellActiveIcon = (props) => (
  <FontAwesomeIcon icon={faCopy} {...props} />
);

export const ImportIcon = (props) => (
  <Icon component={svg.importIcon} {...props} />
);

export const ExportIcon = (props) => (
  <Icon component={svg.exportIcon} {...props} />
);

//radio
export const UnCheckRadioIcon = (props) => (
  <Icon component={svg.unCheckRadioIcon} {...props} />
);

export const CheckRadioIcon = (props) => (
  <Icon component={svg.checkRadioIcon} {...props} />
);

export const RcircleIcon = (props) => (
  <Icon component={svg.rcircleIcon} {...props} />
);

export const EditIcon = (props) => <FontAwesomeIcon icon={faEdit} {...props} />;
export const PlusIcon = (props) => <FontAwesomeIcon icon={faPlus} {...props} />;
export const SaveIcon = (props) => <FontAwesomeIcon icon={faSave} {...props} />;

export const DeleteCraftIcon = (props) => (
  <Icon component={svg.deleteCraftIcon} {...props} />
);
export const MoveCraftIcon = (props) => (
  <Icon component={svg.moveCraftIcon} {...props} />
);
export const ArrowUpCraftIcon = (props) => (
  <Icon component={svg.arrowUpCraftIcon} {...props} />
);

export const EditCraftIcon = (props) => (
  <FontAwesomeIcon icon={faEdit} {...props} />
);

export const CopyCraftIcon = (props) => (
  <FontAwesomeIcon icon={faCopy} {...props} />
);

// slate icon
export const BoldSlateIcon = (props) => (
  <Icon component={svg.boldSlateIcon} {...props} />
);

export const ItelicSlatejsIcon = (props) => (
  <Icon component={svg.itelicSlatejsIcon} {...props} />
);

export const UnderlineSlatejsIcon = (props) => (
  <Icon component={svg.underlineSlatejsIcon} {...props} />
);

export const StrikeThroughtSlatejsIcon = (props) => (
  <Icon component={svg.strikeThroughtSlatejsIcon} {...props} />
);

export const CodeModeSlatejsIcon = (props) => (
  <Icon component={svg.codeModeSlatejsIcon} {...props} />
);

export const UnorderedLisSlagejsIcon = (props) => (
  <Icon component={svg.unorderedLisSlagejsIcon} {...props} />
);

export const OrderedListSlagejsIcon = (props) => (
  <Icon component={svg.orderedListSlagejsIcon} {...props} />
);

export const TextAlignCenterIcon = (props) => (
  <Icon component={svg.textAlignCenterIcon} {...props} />
);

export const TextAlignJustifyIcon = (props) => (
  <Icon component={svg.textAlignJustifyIcon} {...props} />
);

export const TextAlignLeftIcon = (props) => (
  <Icon component={svg.textAlignLeftIcon} {...props} />
);

export const TextAlignRightIcon = (props) => (
  <Icon component={svg.textAlignRightIcon} {...props} />
);

export const TextSizeIcon = (props) => (
  <Icon component={svg.textSizeIcon} {...props} />
);

export const BackgroupColorIcon = (props) => (
  <Icon component={svg.backgroupColorIcon} {...props} />
);

export const BgColorIcon = (props) => (
  <Icon component={svg.bgColorIcon} {...props} />
);

export const FontColorIcon = (props) => (
  <Icon component={svg.fontColorIcon} {...props} />
);

export const FaCogsIcon = (props) => (
  <FontAwesomeIcon icon={faCogs} {...props} />
);

export const FaArchiveIcon = (props) => (
  <FontAwesomeIcon icon={faArchive} {...props} />
);

export const NewCustomerIcon = (props) => (
  <Icon component={svg.newCustomerSvg} {...props} />
);
export const OrderIcon = (props) => (
  <Icon component={svg.orderSvg} {...props} />
);
export const ProductIcon = (props) => (
  <Icon component={svg.productSvg} {...props} />
);
