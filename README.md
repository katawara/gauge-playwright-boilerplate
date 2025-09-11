# gauge-playwright-boilerplate

## 環境構築 for Mac

### 前提条件

- Homebrewがインストールされていることを前提にしています。
    - 未インストールの場合は[公式サイト](https://brew.sh/)を参考にしてください。

### 環境構築手順

コマンド実行はプロジェクトのルートディレクトリにいることを想定しています。

```sh
# ランタイムバージョン管理にはmiseを使っている
brew install mise
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc

# このあとインストールするnodeで警告が出るので事前にインストールする
brew install gpg

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
