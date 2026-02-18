import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '부루마블 - Blue Marble',
    short_name: '부루마블',
    description: 'Next.js 기반 온라인 부루마블 보드게임',
    start_url: '/',
    display: 'standalone',
    orientation: 'landscape',
    theme_color: '#1B5E20',
    background_color: '#1B5E20',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
