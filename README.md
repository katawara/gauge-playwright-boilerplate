# gauge-playwright-boilerplate

GaugeとPlaywrightを組み合わせて作ったE2Eテストの実行環境で、TypeScriptで実装しています。  
クローンしたらすぐに使用・拡張していけるような完成度を目指しています。  
あわせて、自身の運用の練習用としても活用していく想定です。

## 🚀 使用技術スタック

本リポジトリは以下の技術スタックを採用しています。

**開発環境**
- 言語: TypeScript
- 環境バージョンマネージャー: mise （asdfも利用可能）
- アプリケーションパッケージマネージャー: pnpm

**テスト関連**
- 自動テストフレームワーク: Gauge
- ブラウザ操作: Playwright
- 日付操作: dayjs

**品質管理・運用**
- Linter, Formatter: biome
- ライブラリアップデート: Renovate
- CI: GitHub Actions

## 🛠️ 環境構築 for Mac

### 前提条件

開発環境としては以下を前提としています。  
これらのインストールについては特に説明しませんので、未インストールの方は適宜公式サイトを参考にインストールしてください。  
また、別の環境をお使いの場合は、後述の手順は適宜ご自身の環境に合うように読み替えてください。

- システムパッケージマネージャー: Homebrew
- バージョン管理: Git
- エディタ: Visual Studio Code

### 環境構築手順

グローバルのセットアップとして以下を行います。

**Note**:  
本手順はmiseを使った例です。asdfをご利用の場合は公式ドキュメントを参照してセットアップしてください。

```sh
# ランタイムバージョン管理にはmiseを使っている
brew install mise
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc

# このあとインストールするnodeで警告が出るので事前にインストールする
brew install gpg

# mise ls-remote nodeで確認できたバージョンのうち、22系の最新をインストールする
mise ls-remote node
# 22.xx.xxは随時読み替えてください
mise use --global node@22.xx.xx

# Visual Studio CodeでGaugeの拡張機能を使えるようにするためのインストール作業
brew install gauge
npm install -g @getgauge/cli

# バージョン確認（任意）
node -v
gauge --version
```

ここからのコマンド実行はプロジェクトのルートディレクトリにいることを想定しています。

```sh
# mise.tomlに設定されているnodeをインストールする
mise install

# インストールしたnodeでpnpmを有効にする
corepack enable pnpm

# pnpmで依存パッケージをインストールする
pnpm clean:install

# バージョン確認（任意）
node -v
pnpm -v
```

## 📖 使用方法

### テスト実行

```sh
# 全テスト実行
pnpm run:all

# サンプルテストのみ実行
pnpm run:sample

# 安定版テストのみ実行
pnpm run:stable

# 作業中テストのみ実行
pnpm run:wip
```

### CI環境での実行

```sh
# 並列実行・リトライ付き
pnpm run:ci:stable
pnpm run:ci:wip
```

### コード品質維持に便利なコマンド

```sh
# コード品質チェック
pnpm check:code

# マークダウン品質チェック
pnpm check:specs

# コード自動修正
pnpm check:code:apply

# マークダウン自動修正
pnpm check:specs:apply
```

### デバッグや動作確認時に便利なコマンド

```sh
# Playwrightコードジェネレーター
pnpm codegen "<対象WebサイトのURL>"

# トレースを確認する
# トレースファイルのパスは、reports/playwright-report/traces/XXXXX.zipを指定する
# Visual Studio Codeであれば、対象ファイルを右クリックして、"Copy Relative Path"を選ぶと便利
pnpm show-trace "<トレースファイルのパス>"

# テストレポートを開く
pnpm open-report
```

## 📁 プロジェクト構成

```
gauge-playwright-boilerplate/
├── specs/                     # テスト仕様とステップ実装
│   ├── features/              # 各機能の追加実装向け
│   ├── issues/                # インシデント対策など特定の対応向け
│   ├── scenarios/             # 各機能のメジャーなハッピーパス向け
│   └── share/                 # 共通ライブラリ・ユーティリティ
│       ├── lib/               # steps, features, issues, scenariosで共用して使うもの、またはstepsに属さないもの
│       └── steps/             # 共通ステップ定義
│           ├── actions/       # アクション系ステップ
│           ├── assertions/    # 検証系ステップ
│           ├── global/        # フック処理系
│           └── hotel/         # テスト対象サービス固有だけど使いまわしたいステップはサービス名のフォルダを切って実装する
├── reports/                   # テスト実行結果
│   ├── html-report/           # HTMLレポート
│   └── playwright-report/     # Playwrightが生成した動画・トレース
├── env/                       # 環境設定ファイル
│   ├── default/               # デフォルト環境設定
│   └── ci/                    # CI環境設定
└── mise.toml                  # ランタイムバージョン設定
```

## 🔧 トラブルシューティング

### テスト実行時にエラーが発生する

- `pnpm clean:install` を実行して、依存関係を再インストールします
- それでもうまくいかなければ、エラーログを読み適切な対処をしましょう

## 🙏 謝辞

- サンプル実装として用意したテストは、[HOTEL PLANISPHERE \- テスト自動化練習サイト](https://hotel-example-site.takeyaqa.dev/ja/index.html)さんを対象にさせていただいております。ありがとうございます。
- このリポジトリで実装しているアイディアは、[Scalebase株式会社](https://scalebase.co.jp/)で培った知見をベースにしています。ありがとうございます。
