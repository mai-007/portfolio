import { ProfileData } from "./api";

export const staticProfileData: ProfileData = {
  id: "static-profile",
  name: "Mai",
  description: "フロントエンドもできるプロダクトデザイナーです。このサイトも突貫工事ですが自作です。",
  avatar: {
    url: "/myicon.jpeg", // あなたのアバター画像のパス
    height: 100,
    width: 100,
  },
  profileTags: ["UI/UXデザイン", "行動経済学","アクセシビリティ","claudeCode","geminiCLI","フロントエンド","Web開発"],
  experienceTags: ["ディレクター", "UIデザイナー", "Webデザイナー", "フロントエンドエンジニア","プロダクトデザイナー"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
