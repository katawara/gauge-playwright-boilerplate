# gauge-playwright-boilerplate

## 環境構築 for Mac

### 前提条件

- Homebrewがインストールされていることを前提にしています。
    - 未インストールの場合は[公式サイト](https://brew.sh/)を参考にしてください。
- エディタはVisual Studio Codeを、拡張機能として[Gauge](https://marketplace.visualstudio.com/items?itemName=getgauge.gauge)を使うことを想定しています。

### 環境構築手順

グローバルのセットアップとして以下を行います。

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
pnpm install

# バージョン確認（任意）
node -v
pnpm -v
```
