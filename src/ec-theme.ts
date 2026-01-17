import githubDark from '@shikijs/themes/github-dark';
import githubLight from '@shikijs/themes/github-light';
import type { ThemeRegistration } from 'shiki';

const spectreDark: ThemeRegistration = {
  ...githubDark,
  name: 'Spectre Dark',
  colors: {
    ...githubDark.colors,
    "activityBar.background": "#303030",
    "editor.background": "#202020",
    "statusBar.background": "#303030",
    "statusBarItem.remoteBackground": "#303030",
    "tab.activeBackground": "#303030",
    "titleBar.activeBackground": "#303030",
    "editorGroupHeader.tabsBackground": "#282828",
    "panel.background": "#202020",
  }
};

const spectreLight: ThemeRegistration = {
  ...githubLight,
  name: 'Spectre Light',
};

export { spectreDark, spectreLight };
