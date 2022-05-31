import React from 'react';
import {useTranslation, Trans} from 'react-i18next';
import {isEmpty} from 'lodash';
import i18n from '~/i18n';

export const changeLanguage = (language) => {
  if (!isEmpty(language)) {
    i18n.changeLanguage(language);
  }
};

export const translate = (i18nKey, s) => {
  const {t} = useTranslation();
  return t(i18nKey, s);
};

export const trans = (i18nKey) => {
  return <Trans>{i18nKey}</Trans>;
};
