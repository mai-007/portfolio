import { createClient } from "microcms-js-sdk"


// TypeScript interfaces
export interface Work {
  id: string
  title: string
  slug: string
  content?: string
  date?: string
  github?: string
  githubUrl?: string
  figma?: string
  figmaURL?: string
  spimage?: {
    url: string
    height: number
    width: number
  }[]
  eyecatch?: {
    url: string
    height: number
    width: number
  }
  url?: string
  roles?: string
  categories: Category[]
  publishDate: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Skill {
  id: string
  name: string
  logo: {
    url: string
    height: number
    width: number
  }
  createdAt: string
  updatedAt: string
}

export interface ProfileData {
  id: string
  name: string
  description: string
  avatar?: {
    url: string
    height: number
    width: number
  }
  profileTags: string[]
  experienceTags: string[]
  createdAt: string
  updatedAt: string
}

export interface PdfSection {
  id: string
  title: string
  banner: {
    url: string
    height: number
    width: number
  }
  pdfFile: {
    url: string
  }
  createdAt: string
  updatedAt: string
}


// 環境変数のデバッグ情報を表示する関数
export function debugEnvironmentVariables() {
  console.log("=== Environment Variables Debug ===");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("SERVICE_DOMAIN:", process.env.SERVICE_DOMAIN ? "✓ Set" : "✗ Not set");
  console.log("API_KEY:", process.env.API_KEY ? "✓ Set" : "✗ Not set");
  console.log(
    "All env keys:",
    Object.keys(process.env).filter((key) => key.includes("SERVICE") || key.includes("API")),
  );
  console.log("===================================");
}

// microCMSクライアントのインスタンス（遅延初期化）
// この宣言は、getClient関数よりも前に必要です。
// 通常、ファイルのトップレベルに配置します。
let clientInstance: any = null;

// microCMS APIの認証情報が利用可能かチェックする関数
const isApiAvailable = () => {
  const serviceDomain = process.env.SERVICE_DOMAIN;
  const apiKey = process.env.API_KEY;
  return !!(serviceDomain && apiKey);
};


  // microCMSクライアントを取得する関数（シングルトンパターン）
  const getClient = () => {
    const serviceDomain = process.env.SERVICE_DOMAIN;
    const apiKey = process.env.API_KEY;

    // 環境変数が設定されていない場合はエラーを投げる
    if (!serviceDomain || !apiKey) {
      throw new Error(
        `microCMS credentials not configured. SERVICE_DOMAIN: ${serviceDomain ? "OK" : "MISSING"}, API_KEY: ${apiKey ? "OK" : "MISSING"}`,
      );
    }

    // クライアントが未作成の場合のみ新規作成
    if (!clientInstance) { // ここで clientInstance を参照しています
      console.log("Creating microCMS client with domain:", serviceDomain);
      clientInstance = createClient({
        serviceDomain: serviceDomain,
        apiKey: apiKey,
      });
    }

    return clientInstance;
  };


  // 作品データを1件取得する関数（スラッグで検索）
  export async function getPostBySlug(slug: string): Promise<Work | null> {
    try {
      // API接続が利用できない場合は早期リターン
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning null")
        return null
      }

      const client = getClient()
      // microCMS APIから作品データを取得（スラッグでフィルタリング）
      const res = await client.get({
        endpoint: "works", // 作品エンドポイント
        queries: {
          filters: `slug[equals]${slug}`,
          fields: "id,title,slug,content,date,github,githubUrl,figma,figmaURL,spimage,eyecatch,url,roles,categories,publishDate,createdAt,updatedAt",
        }, // スラッグが一致するデータを検索
        customRequestInit: { cache: 'no-store' },
      })
      return res.contents?.[0] || null // 最初の結果を返す（見つからない場合はnull）
    } catch (err) {
      console.error("~~ getPostBySlug ~~", err)
      return null
    }
  }

  

  // 全作品のスラッグ一覧を取得する関数
  export async function getAllSlugs(limit = 100): Promise<Work[]> {
    try {
      // API接続が利用できない場合は空配列を返す
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning empty array")
        return []
      }

      const client = getClient()
      // microCMS APIから作品のタイトルとスラッグのみを取得
      const res = await client.get({
        endpoint: "works", // 作品エンドポイント
        queries: {
          fields: "title,slug,id", // 必要なフィールドのみ取得
          orders: "-publishDate", // 公開日の降順でソート
          limit, // 取得件数の上限
        },
        customRequestInit: { cache: 'no-store' },
      })
      return res.contents || [] // 結果を返す（取得失敗時は空配列）
    } catch (err) {
      console.error("~~ getAllSlugs ~~", err)
      return []
    }
  }

  // 全作品のIDと公開日を取得し、公開日でソートされた配列を返す関数
  export async function getAllWorkIdsSortedByPublishDate(limit = 100): Promise<{ id: string; publishDate: string }[]> {
    try {
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning empty array");
        return [];
      }
      const client = getClient();
      const res = await client.get({
        endpoint: "works",
        queries: {
          fields: "id,publishDate,date",
          orders: "-publishDate", // 公開日の降順でソート
          limit,
        },
        customRequestInit: { cache: 'no-store' },
      });
      return res.contents || [];
    } catch (err) {
      console.error("~~ getAllWorkIdsSortedByPublishDate ~~", err);
      return [];
    }
  }

  // 全作品データを取得する関数（ポートフォリオ表示用）
  export async function getAllPosts(limit = 100): Promise<Work[]> {
    try {
      // API接続が利用できない場合は空配列を返す
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning empty array")
        return []
      }

      const client = getClient()
      // microCMS APIから作品データを取得（表示に必要なフィールドのみ）
      const res = await client.get({
        endpoint: "works", // 作品エンドポイント
        queries: {
          fields: "id,title,slug,eyecatch,url,categories,id,date,roles,content,github,githubUrl,figma,figmaURL,spimage,publishDate,createdAt,updatedAt", // ポートフォリオグリッド表示に必要なフィールド
          orders: "-publishDate", // 公開日の降順でソート（新しい作品が上に）
          limit, // 取得件数の上限
          richEditorFormat: 'html', // リッチエディタの内容をHTML形式で取得
        },
      })
      return res.contents || [] // 作品データの配列を返す
    } catch (err) {
      console.error("~~ getAllPosts ~~", err)
      return []
    }
  }

  // 全カテゴリデータを取得する関数
  export async function getAllCategories(limit = 100): Promise<Category[]> {
    try {
      // API接続が利用できない場合は空配列を返す
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning empty array")
        return []
      }

      const client = getClient()
      // microCMS APIからカテゴリデータを取得
      const res = await client.get({
        endpoint: "categories", // カテゴリエンドポイント
        queries: {
          fields: "name,slug,id", // カテゴリ名とスラッグのみ取得
          limit, // 取得件数の上限
        },
      })
      return res.contents || [] // カテゴリデータの配列を返す
    } catch (err) {
      console.error("~~ getAllCategories ~~", err)
      return []
    }
  }

  // 指定したカテゴリに属する作品データを取得する関数
  export async function getAllPostsByCategory(catID: string, limit = 100): Promise<Work[]> {
    try {
      // API接続が利用できない場合は空配列を返す
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning empty array")
        return []
      }

      const client = getClient()
      // microCMS APIから特定カテ��リの作品データを取得
      const res = await client.get({
        endpoint: "works", // 作品エンドポイント
        queries: {
          filters: `categories[contains]${catID}`, // 指定カテゴリを含む作品をフィルタリング
          fields: "title,slug,eyecatch,url,categories,id", // 表示に必要なフィールド
          orders: "-publishDate", // 公開日の降順でソート
          limit, // 取得件数の上限
        },
      })
      return res.contents || [] // フィルタリングされた作品データを返す
    } catch (err) {
      console.error("~~ getAllPostsByCategory ~~", err)
      return []
    }
  }

  //全スキルデータを取得する関数
  export async function getAllSkills(limit = 100): Promise<Skill[]> {
    try {
      // API接続が利用できない場合は空配列を返す
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning empty array")
        return []
      }

      const client = getClient()
      // microCMS APIからスキルデータを取得
      const res = await client.get({
        endpoint: "skills", // スキルエンドポイント
        queries: {
          fields: "name,logo,id", // スキル名とロゴ画像のみ取得
          limit, // 取得件数の上限
        },
      })
      return res.contents || [] // スキルデータの配列を返す
    } catch (err) {
      console.error("~~ getAllSkills ~~", err)
      return []
    }
  }

  //全スキルデータを取得する関数
  export async function getPdfSections(limit = 100): Promise<PdfSection[]> {
    try {
      // API接続が利用できない場合は空配列を返す
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning empty array")
        return []
      }

      const client = getClient()
      // microCMS APIからPDFセクションデータを取得
      const res = await client.get({
        endpoint: "pdfsections", // PDFセクションエンドポイント
        queries: {
          fields: "title,banner,pdfFile,id", // タイトル、バナー画像、PDFファイルを取得
          limit, // 取得件数の上限
        },
      })
      return res.contents || [] // PDFセクションデータの配列を返す
    } catch (err) {
      console.error("~~ getPdfSections ~~", err)
      return []
    }
  }

  // ポートフォリオ表示用の作品データを取得する関数
  export async function getWorksForPortfolio(limit = 100): Promise<Work[]> {
    try {
      // API接続が利用できない場合は空配列を返す
      if (!isApiAvailable()) {
        console.warn("microCMS API not available, returning empty array")
        return []
      }

      const client = getClient()
      // microCMS APIからポートフォリオ表示用の作品データを取得
      const res = await client.get({
        endpoint: "works", // 作品エンドポイント
        queries: {
          fields: "id,title,slug,eyecatch,url,categories,date,roles,content,github,githubUrl,figma,figmaURL,spimage,publishDate,createdAt,updatedAt", // ポートフォリオグリッド表示に必要なフィールド
          orders: "-publishDate", // 公開日の降順でソート（最新作品を上に表示）
          limit, // 取得件数の上限
          richEditorFormat: 'html', // リッチエディタの内容をHTML形式で取得
        },
      })
      return res.contents || [] // 作品データの配列を返す
    } catch (err) {
      console.error("~~ getWorksForPortfolio ~~", err)
      return []
    }
  }

  // API接続状況をチェックする関数
  export function checkApiAvailability(): { available: boolean; message: string } {
    const serviceDomain = process.env.SERVICE_DOMAIN;
    const apiKey = process.env.API_KEY;

    if (!serviceDomain) {
      return {
        available: false,
        message: "SERVICE_DOMAIN environment variable is not set",
      };
    }

    if (!apiKey) {
      return {
        available: false,
        message: "API_KEY environment variable is not set",
      };
    }

    return {
      available: true,
      message: "microCMS API is configured and ready",
    };
  }
