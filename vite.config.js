import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  root: './',
  base: './', // 生成されたファイルが相対パスでリンクされるように設定
  plugins: [
    ViteImageOptimizer({
      /* ここで詳細な画像圧縮設定が可能ですが、デフォルトでも十分効果があります */
    }),
  ],
  build: {
    outDir: 'dist', // 出力先フォルダ
    emptyOutDir: true, // ビルド時にdistを空にする
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // エントリポイント
      },
      output: {
        // 出力ファイル名のフォーマット設定（ハッシュ値をつけない設定にしています）
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
    minify: 'esbuild',
    cssMinify: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
