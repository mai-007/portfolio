import { NextResponse } from 'next/server';
import {
  getAllPosts,
  getAllCategories,
  getAllSkills,
  checkApiAvailability,
  debugEnvironmentVariables // 追加: デバッグ関数をインポート
} from '@/lib/api';

// サーバー起動時に環境変数をデバッグログに出力
// これをファイルのトップレベルに配置することで、API Routeが初期化される際にログが出力されます
console.log("--- API Route Init ---");
debugEnvironmentVariables(); // ここで呼び出す
console.log("----------------------");


export async function GET() {
  try {
    const apiCheck = checkApiAvailability();
    if (!apiCheck.available) {
      console.error("API Route: MicroCMS API not available.", apiCheck.message);
      // 環境変数が見つからないエラーの場合、500エラーではなく、より具体的なステータスコードを返す
      // 開発中はエラーメッセージを返す
      return NextResponse.json({
        error: "MicroCMS credentials not configured or API unavailable",
        detail: apiCheck.message,
        isConfigured: apiCheck.available // クライアント側で設定状況を判断できるように
      }, { status: 500 }); // または 400 Bad Request など
    }

    // すべてのデータを並行してフェッチ
    const [works, categories, skills] = await Promise.all([
      getAllPosts(),
      getAllCategories(),
      getAllSkills(),
    ]);

    // 取得したデータをJSONレスポンスとして返す
    return NextResponse.json({
      works: works,
      categories: categories,
      skills: skills,
      apiStatus: { available: true, message: "MicroCMS API is configured and ready" } // 成功時はAPIステータスも返す
    });

  } catch (error) {
    console.error("API Route Error fetching microCMS data:", error);
    return NextResponse.json({ error: "Failed to fetch data from microCMS." }, { status: 500 });
  }
}
