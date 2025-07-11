// next.config.mjs (または next.config.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // 画像のプロトコル (http, https)
        hostname: 'images.microcms-assets.io', // 許可したい外部ドメイン名
        port: '', // ポート番号があれば指定、なければ空文字列
        pathname: '/**', // そのドメインのどのパスも許可 (より厳密に指定も可能)
      },
      // 他にも許可したいドメインがあれば、ここにオブジェクトを追加
    ],
  },
};

export default nextConfig;
