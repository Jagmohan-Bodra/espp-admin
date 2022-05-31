const PATH = '/v1';

export default {
  EXAMPLE: '/example',

  SIGN_IN: `/v1/auth/sign-in`,
  FORGET_PASSWORD: `/v1/reset-password`,
  GET_ME: `/v1/me`,

  //notification
  GET_NOTIFICATION_LIST: `${PATH}/notification/get-list`,
  GET_NOTIFICATION_DETAILS: (id) => `${PATH}/notification/${id}`,
  GET_NOTIFICATION_READ: (id) => `${PATH}/notification/${id}/read`,
  GET_NOTIFICATION_DELETE: (id) => `${PATH}/notification/${id}/delete`,
  POST_NOTIFICATION_MULTI_CREATE: `/v1/notification/bulk-create`,

  //notification
  GET_PUSH_NOTIFICATION_LIST: `/v1/push-notification/get-list`,
  GET_PUSH_NOTIFICATION_DETAILS: (id) => `/v1/push-notification/${id}`,
  POST_PUSH_NOTIFICATION_DELETE: (id) => `/v1/push-notification/${id}/delete`,
  POST_PUSH_NOTIFICATION_CREATE: `/v1/push-notification/create`,
  POST_PUSH_NOTIFICATION_UPDATE: (id) => `/v1/push-notification/${id}/update`,
  POST_PUSH_NOTIFICATION_PUSH_NOTIF: (id) => `/v1/push-notification/${id}/push`,

  //feedback
  GET_FEEDBACK_LIST: (id) => `${PATH}/parent/${id}/feedback/get-list`,
  GET_FEEDBACK_DETAILS: (id) => `${PATH}/feedback/${id}`,

  //discussion
  GET_DISCUSSION_LIST: `${PATH}/discussion/get-list`,
  GET_DISCUSSION_DETAILS: (id) => `${PATH}/discussion/${id}`,
  POST_DISCUSSION_LIKE: (id) => `${PATH}/discussion/${id}/toggle-like`,

  //tutor
  GET_SERVICE_AGREEMENT_LIST: (tutorId) =>
    `${PATH}/tutor/${tutorId}/service-agreement`,
  TUTOR_GET_LESSON_PLAN: (tutorId) => `${PATH}/tutor/${tutorId}/lesson-plan`,

  //assignment
  STUDENT_GET_ASSIGNMENT_LIST: (studentId) =>
    `${PATH}/student/${studentId}/get-list-assignment`,

  //upload file
  DOWNLOAD_FILE: (idFile) => `${PATH}/download-file/${idFile}`,

  UPLOAD_FILE: (type) => `${PATH}/upload/file/:${type}`,

  //assignment-submission
  ASSIGNMENT_SUBMISSION_CREATE: `${PATH}/assignment-submission/create`,
  ASSIGNMENT_SUBMISSION_UPDATE: (id) =>
    `${PATH}/assignment-submission/${id}/update`,

  //enrolled class
  ENROLLED_CLASS_LIST: `/v1/enrolled-class/get-list`,
  ENROLLED_CLASS_DETAILS: (id) => `/v1/enrolled-class/${id}`,
  ENROLLED_CLASS_CREATE: `/v1/enrolled-class/create`,
  ENROLLED_CLASS_UPDATE: (id) => `/v1/enrolled-class/${id}/update`,

  CLASS_ATTENDANCE_CREATE: `/v1/class-attendance/create`,
  CLASS_ATTENDANCE_GET_LIST: `/V1/class-attendance/get-list`,

  //trash
  TRASH_GET_LIST: `/v1/trash/get-list`,
  TRASH_GET_DETAILS: (id) => `/v1/trash/${id}`,
  TRASH_DELETE: (id) => `/v1/trash/${id}/delete`,
  TRASH_RESTORE: (id) => `/v1/trash/${id}/restore`,

  //site
  SITE_LIST: `/v1/site/get-list`,
  SITE_DETAILS: (id) => `/v1/site/${id}`,
  SITE_UPDATE: (id) => `/v1/site/${id}/update`,
  SITE_CREATE: `/v1/site/create`,
  SITE_DELETE: (id) => `/v1/site/${id}/delete`,

  //seo setting
  SEO_SETTING_LIST: `/v1/seo-setting/get-list`,
  SEO_SETTING_DETAILS: (id) => `/v1/seo-setting/${id}`,
  SEO_SETTING_UPDATE: (id) => `/v1/seo-setting/${id}/update`,
  SEO_SETTING_CREATE: `/v1/seo-setting/create`,
  SEO_SETTING_DELETE: (id) => `/v1/seo-setting/${id}/delete`,

  // block
  BLOCK_LIST: `/v1/block/get-list`,
  BLOCK_DETAILS: (id) => `/v1/block/${id}`,
  BLOCK_UPDATE: (id) => `/v1/block/${id}/update`,
  BLOCK_CREATE: `/v1/block/create`,
  BLOCK_DELETE: (id) => `/v1/block/${id}/delete`,

  // page
  PAGE_LIST: `/v1/page/get-list`,
  PAGE_DETAILS: (id) => `/v1/page/${id}`,
  PAGE_UPDATE: (id) => `/v1/page/${id}/update`,
  PAGE_CREATE: `/v1/page/create`,
  PAGE_DELETE: (id) => `/v1/page/${id}/delete`,

  // post category
  POST_CATEGORY_LIST: `/v1/post-categories`,
  POST_CATEGORY_DETAILS: (id) => `/v1/post-categories/${id}`,
  POST_CATEGORY_UPDATE: (id) => `/v1/post-categories/${id}`,
  POST_CATEGORY_CREATE: `/v1/post-categories`,
  POST_CATEGORY_DELETE: (id) => `/v1/post-categories/${id}`,

  // post
  POST_LIST: `/v1/posts`,
  POST_DETAILS: (id) => `/v1/posts/${id}`,
  POST_UPDATE: (id) => `/v1/posts/${id}`,
  POST_CREATE: `/v1/posts`,
  POST_DELETE: (id) => `/v1/posts/${id}`,

  //settings
  SETTINGS_LIST: `/v1/settings`,
  SETTINGS_UPDATE: `/v1/settings/update-bulk`,
};
