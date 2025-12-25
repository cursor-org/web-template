import react from '@vitejs/plugin-react'
import path from 'path'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { compression } from 'vite-plugin-compression2'
import RubyPlugin from 'vite-plugin-ruby'

const IGNORE_WARNS_BUILD = 'SOURCEMAP_ERROR'

export default {
  plugins: [
    RubyPlugin(),
    react(),
    compression(),
    chunkSplitPlugin({
      strategy: 'unbundle',
    }),
  ],
  optimizeDeps: {
    include: ['**/*.module.scss'],
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    ssrEmitAssets: true,
    ssrManifest: true,
    minify: true,
    modulePreload: false,
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === IGNORE_WARNS_BUILD) {
          return
        }
        defaultHandler(warning)
      },
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
        //   }
        // if (id.includes("pages/")) {
        //   // Create one chunk per page
        //   const match = id.match(/pages\/(.+?)\//);
        //   return match ? `page-${match[1]}` : "misc";
        // }
        // },
      },
    },
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app/frontend/'),
      '#': __dirname,
    },
  },
}
