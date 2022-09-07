const STORAGE_SETTINGS_KEY = 'settings';

// eslint-disable-next-line consistent-return
const saveSettingsInfo = (url: string, port: number) => {
  const settingsInfo: any = JSON.stringify({ url, port });
  localStorage.setItem(STORAGE_SETTINGS_KEY, settingsInfo);
};

// eslint-disable-next-line consistent-return
const loadSettingsInfo = () => {
  const settingInfo = localStorage.getItem(STORAGE_SETTINGS_KEY);

  const data: any = settingInfo !== null ? JSON.parse(settingInfo) : undefined;
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { saveSettingsInfo, loadSettingsInfo };
