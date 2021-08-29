export const signInConfigValues = {
    header: 'Welcome!',
    defaultCountryCode: '91',
    hideDefaults: true,
    signInFields: [
      {
        label: 'PhoneNumber',
        key: 'PhoneNumber',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password',
      },
    ]
  };

  export const signUpConfigValues = {
    header: 'Welcome to Arv Beverages!',
    defaultCountryCode: '91',
    hideDefaults: true,
    signUpFields: [
      {
        label: 'Username',
        key: 'username',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password',
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 3,
        type: 'email',
      },
      {
        label: 'Name',
        key: 'name',
        required: true,
        displayOrder: 4,
        type: 'string',
      },
    
      {
        label: 'Phone number',
        key: 'phone_number',
        required: false,
        displayOrder: 5,
        type: 'string',
      }
    ]
  };