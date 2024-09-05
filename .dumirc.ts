import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'react-modal-open',
  outputPath: 'docs-dist',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  themeConfig: {
    name: 'react-modal-open',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  alias: {
    'react-modal-open': path.resolve(__dirname, './src'),
    '@': path.resolve(__dirname, './src'),
  },
  resolve: {
    entryFile: './src/index.ts',
  },
  apiParser: {},
  theme: {
    '@c-primary': 'black',
    '@c-heading': '#2b2a2a',
    '@c-text': 'gray'
  },
  publicPath: '/react-modal-open/',
  base: '/react-modal-open/',
  // more config: https://d.umijs.org/config
});
