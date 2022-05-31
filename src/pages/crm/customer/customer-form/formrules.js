export default {
  email: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
    {
      required: true,
      message: 'Please input your Login Email',
    },
  ],
  firstName: [
    {
      required: true,
      message: 'Please input your First Name',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Please input your Last Name',
    },
  ],
  personalEmail: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
    {
      required: true,
      message: 'Please input your Personal Email',
    },
  ],
};
