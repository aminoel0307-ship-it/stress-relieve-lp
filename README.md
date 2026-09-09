# ストレスリリーブ®︎スクール — 申込み用LP（GitHub Pages公開用）

Instagram・YouTube・公式LINEからの流入を「ストレスリリーブ®︎スクール受講相談」へ誘導するための、
日本語1ページ完結型LPです。ビルドツールを使わない静的HTML/CSS/JSで構成しており、
GitHub Pagesでそのまま公開できます。

このリポジトリは `amy-1p`（Amy Salon Business Academy LP）から独立した、
ストレスリリーブ®︎LP専用のリポジトリです。

## 構成

```
stress-relieve-lp/
├── index.html      … LP本体（全16セクション、SEO/OGPメタタグ込み）
├── css/style.css   … スタイル（黒×ゴールド、モバイルファースト、1セクション1メッセージ）
├── js/config.js    … CTAリンク先の設定（ここを書き換えるだけでOK）
├── js/script.js    … CTAリンクの反映、スマホ固定CTA、控えめなスクロールイン演出
├── images/         … 最適化済み画像（WebP＋JPEGフォールバック、Lazy Load対応）
├── favicon.svg     … ファビコン
├── .nojekyll       … GitHub PagesのJekyll処理を無効化（静的サイトのため不要）
└── README.md       … このファイル
```

すべての画像・CSS・JSは相対パス（`css/...` `js/...` `images/...`）で読み込んでいるため、
GitHub Pagesのプロジェクトページ（`https://<アカウント名>.github.io/stress-relieve-lp/`）
でも、カスタムドメインでも、パスを変更することなくそのまま正しく表示されます。

## GitHub Pages公開後に必ず差し替えていただきたい項目

### 1. CTAリンク先（最重要）

`js/config.js` の値を、実際の公式LINE URLに書き換えてください。
「受講相談」「受講希望」「相談する」等の相談・お問い合わせ系CTAはすべて、
この1本の公式LINE URLに統一されています（別途フォームは使用していません）。

```js
window.SITE_CONFIG = {
  lineUrl: "https://lin.ee/C0byPWO" // 公式LINEの友だち追加URL
};
```

これだけで、ページ内すべての「ストレスリリーブ®︎受講相談をする」ボタン（`.js-cta-consult`）と
「公式LINEで相談する」「LINE相談」ボタン（`.js-cta-line`）に一括反映されます。

### 2. 公開URL（ドメイン）の確認

`index.html` 内の以下の3箇所は、GitHubアカウント名が `aminoel0307-ship-it` であることを前提に
`https://aminoel0307-ship-it.github.io/stress-relieve-lp/` を設定しています。
実際に公開するアカウント名・リポジトリ名が異なる場合、または独自ドメインを使う場合は書き換えてください。

- `<link rel="canonical" href="...">`
- `<meta property="og:url" content="...">` と `<meta property="og:image" content="...">`
- `<meta name="twitter:image" content="...">`

### 3. フッターのリンク

「プライバシーポリシー」「特定商取引法に基づく表記」「お問い合わせ」（現在は仮リンク `#`）を、
実際のページURLに差し替えてください。

## ローカルでの表示確認

```bash
cd stress-relieve-lp
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開いてください。

## デザイン意図

- メインカラー：`#0A0A0A`（黒）／`#111111`（チャコール）／`#D4AF37`・`#C89B3C`（ゴールド）／`#F7F3EA`（アイボリー）／`#FFFFFF`（白）
- 見出しに明朝体（Shippori Mincho）、本文にNoto Sans JPを使用
- スマートフォン表示を最優先（Instagram広告等のアプリ内ブラウザでも、スクロールなしでファーストビューの見出し・CTAが収まる設計）
- CTAボタンは常にゴールド系。スマホでは画面下部に固定表示（LINE相談／受講相談の2ボタン）
