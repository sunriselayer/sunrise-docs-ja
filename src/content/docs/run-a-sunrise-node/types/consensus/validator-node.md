---
title: バリデーターノード
description: バリデーターノードを使うと、Sunrise ネットワークのコンセンサスに参加できます。
---

バリデーターノードを使うと、Sunrise ネットワークのコンセンサスに参加できます。

## ハードウェア要件

バリデーターノードを動かすために、次の最低ハードウェア要件が推奨されます。

- メモリ: 8 GB RAM（最小）
- CPU: 6 コア
- ディスク: 500 GB SSD ストレージ
- 帯域幅: ダウンロード 1 Gbps / アップロード 1 Gbps

## ノードの実行

まず、[フルコンセンサスノードのセットアップ](/run-a-sunrise-node/types/consensus/full-consensus-node) の手順に従ってください。

### オプション: 作業ディレクトリのリセット

過去に sunrised の作業ディレクトリを初期化したことがある場合は、新しいディレクトリを再初期化する前にクリーンアップする必要があります。次のコマンドで実行できます。

```bash
sunrised tendermint unsafe-reset-all
```

### 作業ディレクトリの初期化

次のコマンドを実行します。

```bash
CHAIN_ID=sunrise-1 # メインネットの場合
MONIKER="validator-name"
sunrised init "$MONIKER" --chain-id $CHAIN_ID
```

現在の chain-id は [Github](https://github.com/sunriselayer/network) を確認してください。

### 新しいキーの作成

```bash
VALIDATOR_WALLET="validator"
sunrised keys add $VALIDATOR_WALLET --keyring-backend test
```

### バリデーターの公開鍵

バリデーターを初期化する前に最後に必要なのは、ノードを最初に初期化したときに作られたバリデーター公開鍵です。バリデーターの pubkey を取得するには次を実行します。

```bash
sunrised tendermint show-validator
{"@type":"/cosmos.crypto.ed25519.PubKey","key":"ZQweivhEkT/akg5RT6RWkElt43rr5cf+qu/QQ5jOpmQ="}
```

### バリデーターの作成

バリデーターを作成するには、最低 1 vRISE が必要です。vRISE は譲渡できないため、アカウントに残高がない場合は、流動性プールにポジションを作って vRISE を獲得してください。

まず、バリデーター設定ファイル `~/.sunrise/config/validator.json` を作成します。

```json
{
  "pubkey": {"@type":"/cosmos.crypto.ed25519.PubKey","key":"ZQweivhEkT/akg5RT6RWkElt43rr5cf+qu/QQ5jOpmQ="},
  "amount": "1000000uvrise",
  "moniker": "your_validator's_name",
  "identity": "optional identity signature (ex. UPort or Keybase)",
  "website": "validator's (optional) website",
  "security": "validator's (optional) security contact email",
  "details": "validator's (optional) details",
  "commission-rate": "0.1",
  "commission-max-rate": "0.2",
  "commission-max-change-rate": "0.01",
  "min-self-delegation": "1"
}
```

次に、次のコマンドを実行します。

```bash
sunrised tx staking create-validator [path/to/validator.json] \
    --chain-id=$CHAIN_ID \
    --from=$VALIDATOR_WALLET \
    --keyring-backend=test \
    --gas-prices=0.025uusdrise --gas-adjustment 1.2 \
    --gas=auto \
    -y
```

## バックアップ

何らかの理由でバリデーターが損傷したり失われたりした場合に復元できるよう、特定のファイルをバックアップする必要があります。`~/.sunrise/config/` にある次のファイルを安全にバックアップしてください。

- `priv_validator_key.json`
- `node_key.json`

これらのファイルのバックアップは暗号化することを推奨します。

## バリデーターへの追加インセンティブ

:::caution
「バリデーターへの追加インセンティブ」の申請期間は 2025 年 10 月 15 日に終了しました。再開日は未定です。すでに chain-registry に登録し、要件を満たしているバリデーターへの委任は完了しています。

プログラムの資金プールが枯渇したため、いま要件を満たしても（例: tx indexer を有効にする）追加委任の対象にはなりません。ご注意ください。
:::

コアチームは、次のサービスを提供するバリデーターへ、より多くの RISE を委任します。

### RPC / API / gRPC

- **委任量:** 各サービス（RPC、API、gRPC）あたり 250,000 RISE。上限は合計 750,000 RISE です。
- **条件:**
  - エンドポイントを [chain-registry](https://github.com/cosmos/chain-registry/blob/master/sunrise/chain.json) へのプルリクエストで提出し、マージされること。
  - トランザクション indexer と CORS が有効であること。

### エクスプローラー

- **委任量:** 25,000 RISE。
- **条件:**
  - エクスプローラーを [chain-registry](https://github.com/cosmos/chain-registry/blob/master/sunrise/chain.json) へのプルリクエストで提出し、マージされること。
- **追加委任:**
  - 公式の Sunrise サービス内でエクスプローラーが使われる場合、追加委任を行います。個別にご連絡します。

参加人数に応じて、これらのインセンティブの内容は変わる場合があります。
